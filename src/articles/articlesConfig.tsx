import type { Metadata } from 'next/types';
export type ArticleMetadata = Metadata & {
  title: string;
  description: string;
  path: string;
  slug: string;
  date: string;
};

export const articlePath = 'src/articles';

export const articlesMetadataPromise: Promise<ArticleMetadata[]> = Promise.all([
  import('@/articles/test.mdx'),
]).then((modules) =>
  modules.map((module) => module.metadata as ArticleMetadata)
);
//metadata 的範例
// export const metadata = {
//   title: 'Post with code',
//   description: 'My post with code',
//   path: 'article',
//   slug: 'hello-world',
//   date: '2022-09-01',
// };
