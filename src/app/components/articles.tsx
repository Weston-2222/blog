import Link from 'next/link';
import CldImage from '@/components/cldImage';
import { ArticleMetadata, postsPromise } from '@/articles/articlesConfig';

import { cn } from '@/lib/utils';
import MotionDiv from '@/components/framer/motionDiv';

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
        <MotionDiv
          key={article.slug}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            href={article.url}
            key={article.slug}
            className={cn(
              'flex flex-col items-center justify-center w-[300px] bg-foreground rounded-lg overflow-hidden cursor-pointer shadow-lg hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15] p-4',
              className
            )}
          >
            <CldImage
              width='350'
              height='350'
              src={article.image}
              alt={article.title}
            />
            <p className='text-xl font-bold pt-2'>{article.title}</p>
            <p className='text-sm text-gray-500'>{article.description}</p>
            <p className='text-sm text-gray-500'>{article.date}</p>
            {/* <Link key={article.slug} href={path.join(article.path, article.slug)}>
            {article.title}
          </Link> */}
          </Link>
        </MotionDiv>
      ))}
    </>
  );
};

export default Articles;
