import { postsPromise } from '@/articles/articlesConfig';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';
// 在 build 時，生成靜態路由
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const posts = await postsPromise;
  return posts.map((post) => ({ slug: post.metadata.slug }));
};

// 動態生成 metadata
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const posts = await postsPromise;
  const post = posts.find((article) => article.metadata.slug === slug);

  if (post) {
    return post.metadata;
  } else {
    notFound(); // `notFound` 會終止函數執行
  }
};

type Params = Promise<{ slug: string }>;
const Page = async ({ params }: { params: Params }) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const articlesMetadata = await postsPromise;
  const post = articlesMetadata.find(
    (article) => article.metadata.slug === slug
  );

  if (!post) {
    notFound();
  }

  let Post;
  try {
    ({ default: Post } = post);
  } catch (error) {
    console.error(`Failed to load component at ${path}:`, error);
    notFound();
  }
  const { title, description } = post.metadata;
  return (
    <section className='max-w-2xl p-6 space-y-2'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='text-lg text-gray-500'>{description}</p>
      <Post />
    </section>
  );
};

export default Page;
