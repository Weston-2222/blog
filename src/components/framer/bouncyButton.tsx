'use client';
import 'client-only';
import { motion } from 'framer-motion';

const BouncyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.button
      whileTap={{
        scale: 1.2, // 放大
        y: -10, // 向上跳
      }}
      transition={{
        type: 'spring', // 弹性效果
        stiffness: 300,
        damping: 10,
      }}
    >
      {children}
    </motion.button>
  );
};

export default BouncyButton;
