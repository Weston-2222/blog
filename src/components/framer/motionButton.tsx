'use client';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

type MotionButtonProps = MotionProps & {
  children: React.ReactNode;
};

const MotionButton: React.FC<MotionButtonProps> = ({ children, ...props }) => {
  return <motion.button {...props}>{children}</motion.button>;
};

export default MotionButton;
