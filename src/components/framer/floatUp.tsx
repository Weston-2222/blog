'use client';
import { motion } from 'framer-motion';

const FloatUp = ({ children }: { children: React.ReactNode }) => {
  const hoverAnimation = {
    scale: 1.1,
    y: -5,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  };

  return (
    <>
      <motion.div
        className='rounded-lg cursor-pointer text-center'
        whileHover={hoverAnimation}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default FloatUp;
