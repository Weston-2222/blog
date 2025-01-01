import React from 'react';

import Link from 'next/link';
import path from 'path';
import { articlesMetadataPromise } from '@/articles/articlesConfig';
const Articles = async () => {
  const articlesMetadata = await articlesMetadataPromise;
  console.log(articlesMetadata);
  return (
    <div>
      {articlesMetadata.map((article) => (
        <Link key={article.slug} href={path.join(article.path, article.slug)}>
          {article.title}
        </Link>
      ))}
    </div>
  );
};

export default Articles;
