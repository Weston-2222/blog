import type { Metadata } from 'next/types';

export type ArticleMetadata = Metadata & {
  title: string;
  description: string;
  path: string;
  slug: string;
  date: string;
  url: string;
  image: string;
};

export const articlePath = 'src/articles';

export const postsPromise = Promise.all([
  import('@/articles/treejs-two-pitfalls/treejs-two-pitfalls.mdx'),
]);

export const getArticleMetadata = async (
  slug: string
): Promise<ArticleMetadata> => {
  const post = (await postsPromise).find(
    (article) => article.metadata.slug === slug
  );
  if (!post) return Promise.reject({});
  return post.metadata;
};
//metadata 的範例
// export const metadata = {
//   title: 'Post with code',
//   description: 'My post with code',
//   path: 'article',
//   slug: 'hello-world',
//   date: '2022-09-01',
// };
