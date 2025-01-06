import Image from 'next/image';
import Link from 'next/link';

import { ArticleMetadata, postsPromise } from '@/articles/articlesConfig';

import { cn } from '@/lib/utils';

interface ArticlesProps {
  className?: string;
}
const Articles = async ({ className }: ArticlesProps) => {
  const articlesMetadata: ArticleMetadata[] = (await postsPromise).map(
    (post) => post.metadata
  );

  return (
    <>
      {articlesMetadata.map((article) => (
        <Link
          href={article.url}
          key={article.slug}
          className={cn(
            'bg-foreground rounded-lg overflow-hidden cursor-pointer shadow-lg hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15] p-4',
            className
          )}
        >
          <Image
            src={article.image}
            alt={article.title}
            width={350}
            height={350}
            className='object-cover'
          />
          <p className='text-xl font-bold pt-2'>{article.title}</p>
          <p className='text-sm text-gray-500'>{article.description}</p>
          <p className='text-sm text-gray-500'>{article.date}</p>
          {/* <Link key={article.slug} href={path.join(article.path, article.slug)}>
            {article.title}
          </Link> */}
        </Link>
      ))}
    </>
  );
};

export default Articles;
