'use client';
import 'client-only';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

type MotionDivProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
};

const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
};

export default MotionDiv;
