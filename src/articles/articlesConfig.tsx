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
  import('@/articles/hello.mdx'),
  import('@/articles/hello-world.mdx'),
  import('@/articles/test.mdx'),
]).then((modules) =>
  modules.map((module) => module.metadata as ArticleMetadata)
);
