import { articlesMetadataPromise } from '@/articles/articlesConfig';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

//在build時，生成靜態路由
export const dynamicParams = false;
export const generateStaticParams = async () => {
  const articles = await articlesMetadataPromise;
  return articles.map((article) => ({ slug: article.slug }));
};

//動態生成metadata
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const slug = (await params).slug;
  const articlesMetadata = await articlesMetadataPromise;
  const metadata = articlesMetadata.find((article) => article.slug === slug);

  if (metadata) {
    return metadata;
  } else {
    return notFound();
  }
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const path = `@/articles/${slug}.mdx`;
  const { default: Post } = await import(path);
  const articlesMetadata = await articlesMetadataPromise;
  const metadata = articlesMetadata.find((article) => article.slug === slug);
  if (!metadata) return notFound();

  return (
    <section className='max-w-2xl p-6'>
      <h1 className='text-4xl font-bold'>{metadata?.title}</h1>
      <p className='text-sm text-gray-500'>{metadata?.description}</p>
      <Post />
    </section>
  );
};
export default Page;
