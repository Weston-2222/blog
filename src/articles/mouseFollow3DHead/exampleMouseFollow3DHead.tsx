'use client';
import 'client-only';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const MouseFollow3DHead = dynamic(
  () => import('@/components/mouseFollow3DHead'),
  {
    ssr: false,
    loading: () => <div className='h-[300px] w-[300px]'></div>,
  }
);
const ExampleMouseFollow3DHead = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 1.5,
        type: 'spring',
        stiffness: 200,
        damping: 10,
      }}
    >
      <MouseFollow3DHead
        canvasSize={{ width: 300, height: 300 }}
        modelPath='/models/minecraft_fox_head.glb'
        className='flex justify-center items-center'
      />
    </motion.div>
  );
};

export default ExampleMouseFollow3DHead;
