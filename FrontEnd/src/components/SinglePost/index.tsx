import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';
import { notFound } from 'next/navigation';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const postRes = await findPublicPostBySlugCached(slug);

  if (!postRes.success) {
    notFound();
  }

  const post = postRes.data;

  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const imageUrl = post.coverImageUrl.startsWith('http')
    ? post.coverImageUrl
    : `${backendUrl}${post.coverImageUrl}`;

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <img
          className='rounded-xl w-full h-auto object-cover'
          src={imageUrl}
          alt={post.title}
        />

        <PostHeading url={`/post/${post.slug}`}>
          {post.title}
        </PostHeading>

        <p>
          {post.author.name} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
