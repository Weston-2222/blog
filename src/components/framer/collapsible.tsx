'use client';
import 'client-only';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconArrowDown } from '@tabler/icons-react';

const Collapsible = ({
  children,
  foldHeight,
}: {
  children: React.ReactNode;
  foldHeight: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      id='collapsible'
      style={{
        position: 'relative', // 父容器設為相對定位
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {/* 動畫程式碼區塊 */}
      <motion.div
        style={{
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
        }}
        initial={{ height: '100px' }}
        animate={{ height: isExpanded ? 'auto' : foldHeight }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 40,
          duration: 1.5,
        }}
      >
        {children}
      </motion.div>

      {/* 動畫按鈕 */}
      <motion.button
        onClick={toggleExpand}
        whileHover={{
          scale: 1.1, // 滑鼠懸停放大
          transition: { duration: 0.4 },
        }}
        whileTap={{ scale: 0.9 }} // 點擊縮小效果
        style={{
          position: 'absolute', // 絕對定位
          bottom: '5px', // 按鈕置於區塊的頂部
          left: '45%', // 改為使用 left: 50%
          border: 'none',
          width: '50px',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '10%',
          opacity: 0.8,
        }}
        className='bg-mark'
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }} // 旋轉箭頭
          transition={{ type: 'tween', duration: 0.7 }}
        >
          <IconArrowDown size={16} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Collapsible;
