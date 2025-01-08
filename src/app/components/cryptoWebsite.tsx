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
// import MouseFollow3DHead from '@/components/mouseFollow3DHead';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
const MouseFollow3DHead = dynamic(
  () => import(/*MouseFollow3DHead*/ '@/components/mouseFollow3DHead'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className='w-[300px] h-[300px]' />,
  }
);
// 可傳入 className 作為額外的樣式
type ResumeBlockProps = {
  className?: string;
};

// 各個元素的動畫變體 (Variants) 設定
const iconWorldVariants = {
  rest: {
    opacity: 1,
    y: 40,
    x: 15,
    transition: { duration: 0.3, delay: 0.7 },
  },
  hover: {
    opacity: 0,
    y: 40,
    x: 260,
    transition: { duration: 0.7, delay: 0.2 },
  },
};

const myProjectVariants = {
  rest: {
    opacity: 1,
    y: 50,
    x: 20,
    transition: { duration: 0.5, delay: 0.7 },
  },
  hover: {
    opacity: 0,
    y: 50,
    x: 230,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

const websiteLinkVariants = {
  rest: {
    opacity: 0,
    y: 50,
    x: 0,
    transition: { duration: 0.3, delay: 0.5 },
  },
  hover: {
    opacity: 1,
    y: -30,
    x: 5,
    transition: { duration: 0.3, delay: 0.3 },
  },
};

const coinIconsContainerVariants = {
  rest: {
    opacity: 0,
    y: -60,
    x: 20,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.2, // 子元素之間的延遲
      delay: 0.5,
    },
  },
  hover: {
    opacity: 1,
    y: -70,
    x: 20,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2, // 子元素之間的延遲
      delay: 0.5,
    },
  },
};

// 子元素 (加密貨幣圖示) 的動畫變體
const iconVariants = {
  rest: {
    opacity: 0,
    y: -90, // 向下偏移
    transition: { duration: 0.3 },
  },
  hover: {
    opacity: 1,
    y: -20,
    transition: { duration: 0.3 },
  },
};
const headModelVariants = {
  rest: {
    opacity: 1,
    y: -230,
    x: 60,
    transition: { duration: 0.3, delay: 1 },
  },
  hover: {
    opacity: 1,
    y: -170,
    x: 130,
    transition: { duration: 0.3 },
  },
};

const CryptoWebsite = ({ className }: ResumeBlockProps) => {
  // 控制滑鼠移入與移出狀態
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial='rest'
        animate={isHovered ? 'hover' : 'rest'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'relative w-[300px] h-[156px] bg-foreground rounded-lg overflow-hidden cursor-pointer shadow-lg hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15]',
          className
        )}
      >
        {/* 復古網格背景效果 */}
        <RetroGrid angle={isHovered ? 65 : 0} />

        {/* 地球圖示 */}
        <motion.div variants={iconWorldVariants}>
          <IconWorld className='transition-all duration-300 h-[48px] w-[48px]' />
        </motion.div>

        {/* 我的專案標題 */}
        <motion.div variants={myProjectVariants}>
          <p className='text-xl font-bold pb-10'>我的專案</p>
        </motion.div>

        {/* 網站連結按鈕 */}
        <motion.div variants={websiteLinkVariants} className='absolute'>
          <Link
            href='https://crypto-website-nextjs-delta.vercel.app'
            target='_blank'
            rel='noopener noreferrer'
            className='z-10'
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
          <motion.div variants={iconVariants}>
            <CldImage
              width='50'
              height='50'
              src='bitcoin-icon'
              alt='bitcoin-icon'
            />
          </motion.div>
          {/* Ethereum 圖示 */}
          <motion.div variants={iconVariants}>
            <CldImage
              width='50'
              height='50'
              src='ethereum-icon'
              alt='ethereum-icon'
            />
          </motion.div>
          {/* Cardano 圖示 */}
          <motion.div variants={iconVariants}>
            <CldImage
              width='50'
              height='50'
              src='cardano-icon'
              alt='cardano-icon'
            />
          </motion.div>
        </motion.div>

        <motion.div variants={headModelVariants}>
          <MouseFollow3DHead
            canvasSize={{ width: 300, height: 300 }}
            modelPath='/models/minecraft_fox_head.glb'
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CryptoWebsite;
