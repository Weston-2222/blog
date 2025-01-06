'use client';
import 'client-only';
import { cn } from '@/lib/utils';
import { IconCloud } from '@/components/ui/icon-cloud';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { FileUser } from 'lucide-react';

import { motion } from 'framer-motion';
import Link from 'next/link';

type ResumeBlockProps = {
  className?: string;
};
const slugs = [
  'typescript',
  'javascript',
  'react',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'jest',
  'docker',
  'git',
  'github',
  'angular',
  'tailwindcss',
  'postgresql',
  'mongodb',
  'redis',
];
const images = slugs.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

const ResumeBlock = ({ className }: ResumeBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className={cn(
          'relative w-[300px] h-[156px] bg-foreground rounded-lg overflow-hidden cursor-pointer shadow-lg p-4 hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15]',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 其他內容可以放在這裡 */}
        <motion.div
          initial={{ y: 50 }}
          animate={
            isHovered ? { y: '-60%', x: '-20%' } : { y: '-20%', x: '20%' }
          }
          transition={{ duration: 0.3 }}
          className='absolute'
        >
          <IconCloud images={images} />
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          animate={
            isHovered ? { y: '70%', x: '270%' } : { y: '25%', x: '-20%' }
          }
          transition={{ duration: 0.3 }}
          className='absolute bottom-15 left-[15px] transform -translate-x-1/2 px-4 py-2  rounded'
        >
          <FileUser className='transition-all duration-300 h-[48px] w-[48px]' />
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          animate={
            isHovered ? { y: '110%', x: '160%' } : { y: '90%', x: '-15%' }
          }
          transition={{ duration: 0.3 }}
          className='absolute bottom-15 left-[15px] transform -translate-x-1/2 px-4 py-2  rounded'
        >
          <p className='text-xl font-bold pb-10'>我的履歷</p>{' '}
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          animate={
            isHovered
              ? { y: '180%', x: '-10%', opacity: 1 }
              : { y: '210%', x: '30%', opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className='absolute bottom-15 left-[15px] transform -translate-x-1/2 px-4 py-2  rounded'
        >
          <Link href='/resume'>
            <button className='rounded-md p-1 flex items-center'>
              <FileUser className='h-5 w-5' />
              Resume
              <IconArrowRight stroke={2} className='h-4 w-4' />
            </button>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ResumeBlock;
