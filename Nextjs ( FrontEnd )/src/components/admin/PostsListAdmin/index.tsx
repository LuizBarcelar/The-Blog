import { findAllPostFromApiAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import ErrorMessage from '../../ErrorMessage';

export default async function PostsListAdmin() {
  const postsRes = await findAllPostFromApiAdmin();

  // 💡 A correção está nestas linhas:
  const isLoginAllowed = process.env.ALLOW_LOGIN === '1';

  if (!postsRes.success) {
    console.log(postsRes.errors);

    // Se estiver liberado, mostra um aviso amigável em vez de erro de login
    if (isLoginAllowed) {
      return (
        <div className="mb-16 p-6 border-2 border-dashed border-zinc-700 rounded-lg text-center">
          <p className="text-zinc-400 mb-4">A API não retornou posts (não autenticado), mas o login está liberado.</p>
          <Link
            href="/admin/post/new"
            className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-zinc-200 transition-colors"
          >
            + Criar meu primeiro post
          </Link>
        </div>
      );
    }

    return (
      <ErrorMessage
        contentTitle='Ei 😅'
        content='Tente fazer login novamente'
      />
    );
  }

  const posts = postsRes.data || [];

  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle='Ei 😅' content='Bora criar algum post??' />
    );
  }

  return (
    <div className='mb-16'>
      {posts.map((post: any) => (
        <div
          className={clsx(
            'py-2 px-2',
            !post.published && 'bg-slate-300',
            'flex gap-2 items-center justify-between',
          )}
          key={post.id}
        >
          <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

          {!post.published && (
            <span className='text-xs text-slate-600 italic'>
              (Não publicado)
            </span>
          )}

          <DeletePostButton id={post.id} title={post.title} />
        </div>
      ))}
    </div>
  );
}
