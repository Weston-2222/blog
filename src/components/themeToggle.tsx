'use client';
import { useTheme } from 'next-themes';
import { IconSun, IconMoonFilled } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='theme-toggle rounded-md'>
      <button
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
        className='p-1'
      >
        <AnimatePresence mode='wait' initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key='sun'
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <IconSun stroke={1.5} className='h-6 w-6' />
            </motion.div>
          ) : (
            <motion.div
              key='moon'
              initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -45 }}
              transition={{ duration: 0.3 }}
            >
              <IconMoonFilled className='h-6 w-6' />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default ThemeToggle;
