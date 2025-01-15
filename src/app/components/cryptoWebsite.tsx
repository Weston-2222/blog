'use client';
import 'client-only';
import { cn } from '@/lib/utils';
import {
  IconCoinBitcoinFilled,
  IconExternalLink,
  IconWorld,
} from '@tabler/icons-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import RetroGrid from '@/components/ui/retro-grid';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import dynamic from 'next/dynamic';

const MouseFollow3DHead = dynamic(
  () => import(/*MouseFollow3DHead*/ '@/components/mouseFollow3DHead'),
  {
    ssr: false,
  }
);
// 可傳入 className 作為額外的樣式
type ResumeBlockProps = {
  className?: string;
};

const containerVariants = {
  rest: {
    transition: {
      transition: {
        staggerChildren: 0.2, // 子元素之間的延遲
      },
    },
  },
  hover: {
    transition: {
      staggerChildren: 0.2, // 子元素之間的延遲
    },
  },
};

// 各個元素的動畫變體 (Variants) 設定
const iconWorldVariants = {
  rest: {
    opacity: 1,
    y: -210,
    x: 15,
    transition: { duration: 0.3 },
  },
  hover: {
    opacity: 0,
    y: -210,
    x: 200,
    transition: { duration: 0.4 },
  },
};

const websiteLinkVariants = {
  rest: {
    opacity: 0,
    y: -150,
    x: 5,
    transition: { duration: 0.4 },
  },
  hover: {
    opacity: 1,
    y: -270,
    x: 5,
    transition: { duration: 0.3 },
  },
};

const coinIconsContainerVariants = {
  rest: {
    opacity: 0,
    y: -380,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    opacity: 1,
    y: -330,
    x: 20,
    transition: {
      duration: 0.3,
    },
  },
};

const headModelVariants = {
  rest: {
    opacity: 1,
    y: -10,
    x: 90,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  hover: {
    opacity: 1,
    y: -10,
    x: 160,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
};

const CryptoWebsite = ({ className }: ResumeBlockProps) => {
  // 控制滑鼠移入與移出狀態
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial='rest'
        animate={isHovered ? 'hover' : 'rest'}
        variants={containerVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative w-[300px] h-[156px] bg-foreground rounded-lg overflow-hidden shadow-lg hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15]',
          className
        )}
      >
        {/* 復古網格背景效果 */}
        <RetroGrid angle={isHovered ? 65 : 0} className='z-[-1]' />
        <motion.div variants={headModelVariants}>
          <MouseFollow3DHead
            canvasSize={{ width: 250, height: 250 }}
            modelPath='/models/minecraft_fox_head.glb'
          />
        </motion.div>

        {/* 地球圖示 */}
        <motion.div variants={iconWorldVariants} className='w-[100px]'>
          <IconWorld className='h-[48px] w-[48px]' />
          {/* 我的專案標題 */}
          <p className='text-xl font-bold pb-10'>我的專案</p>
        </motion.div>

        {/* 網站連結按鈕 */}
        <motion.div variants={websiteLinkVariants} className='absolute'>
          <Link
            href='https://crypto-website-nextjs-delta.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            prefetch={false} // 加入此屬性以避免預先載入
          >
            <button className='rounded-md p-1 flex items-center gap-1'>
              <IconCoinBitcoinFilled className='h-5 w-5' />
              加密貨幣資訊收集網站
              <IconExternalLink className='h-5 w-5' />
            </button>
          </Link>
        </motion.div>

        {/* 加密貨幣圖示容器 */}
        <motion.div
          variants={coinIconsContainerVariants}
          className='grid grid-cols-3 w-[180px]'
        >
          {/* Bitcoin 圖示 */}

          <CldImage
            width='50'
            height='50'
            src='bitcoin-icon'
            alt='bitcoin-icon'
          />

          {/* Ethereum 圖示 */}

          <CldImage
            width='50'
            height='50'
            src='ethereum-icon'
            alt='ethereum-icon'
          />

          {/* Cardano 圖示 */}

          <CldImage
            width='50'
            height='50'
            src='cardano-icon'
            alt='cardano-icon'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CryptoWebsite;
