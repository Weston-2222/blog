'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const FloatUp = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const hoverAnimation = {
    scale: 1.1,
    y: -5,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  };

  return (
    <>
      <motion.div
        className={cn('rounded-lg cursor-pointer text-center', className)}
        whileHover={hoverAnimation}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default FloatUp;
