'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt = '',
  width = 300,
  height = 200,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 小尺寸圖片區塊 */}
      <div
        className={cn('inline-block cursor-pointer', className)}
        onClick={handleOpen}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className='object-cover'
        />
      </div>

      {/* 放大 Dialog 區塊 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose} // 按下背景也可以關閉
          >
            {/* 防止點擊圖片本身也把 Dialog 關閉，可以用 stopPropagation */}
            <motion.div
              className='relative'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={1000}
                height={1000}
                className='object-contain max-h-[100vh] max-w-[100vw]'
              />
              {/* 關閉按鈕 */}
              <button
                onClick={handleClose}
                className='absolute top-0 right-0 m-2 text-white bg-black/50 px-2 py-1 rounded hover:bg-black'
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZoomableImage;
