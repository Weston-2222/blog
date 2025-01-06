import { articlesMetadataPromise } from '@/articles/articlesConfig';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 在 build 時，生成靜態路由
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const articles = await articlesMetadataPromise;
  return articles.map((article) => ({ slug: article.slug }));
};

// 動態生成 metadata
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const articlesMetadata = await articlesMetadataPromise;
  const metadata = articlesMetadata.find((article) => article.slug === slug);

  if (metadata) {
    return metadata;
  } else {
    notFound(); // `notFound` 會終止函數執行
  }
};
type Params = Promise<{ slug: string }>;
const Page = async ({ params }: { params: Params }) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const articlesMetadata = await articlesMetadataPromise;
  const metadata = articlesMetadata.find((article) => article.slug === slug);

  if (!metadata) {
    notFound();
  }

  const path = metadata.path;

  let Post;
  try {
    ({ default: Post } = await import(path));
  } catch (error) {
    console.error(`Failed to load component at ${path}:`, error);
    notFound();
  }

  return (
    <section className='max-w-2xl p-6 space-y-2'>
      <h1 className='text-4xl font-bold'>{metadata.title}</h1>
      <p className='text-lg text-gray-500'>{metadata.description}</p>
      <Post />
    </section>
  );
};

export default Page;
