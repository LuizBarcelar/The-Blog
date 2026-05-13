import { PostModelFromApi } from '@/models/post/post-model';
import { apiRequest } from '@/utils/api-request';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  unstable_cache(
    async () => {
      return await apiRequest<PostModelFromApi[]>(`/post`, {
        next: {
          tags: ['posts'],
          revalidate: 86400,
        },
      });
    },
    ['posts'],
    {
      tags: ['posts'],
    },
  ),
);

export const findPublicPostBySlugCached = cache((slug: string) => {
  return unstable_cache(
    async (slug: string) => {
      const postResponse = await apiRequest<PostModelFromApi>(
        `/post/${slug}`,
        {
          next: {
            tags: [`post-${slug}`],
            revalidate: 86400,
          },
        },
      );

      if (!postResponse.success || !postResponse.data) {
        notFound();
      }

      return postResponse;
    },
    [`post-${slug}`],
    {
      tags: [`post-${slug}`],
    },
  )(slug);
})
