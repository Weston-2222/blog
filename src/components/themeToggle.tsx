'use client';
import { useTheme } from 'next-themes';
import { IconSun, IconMoonFilled } from '@tabler/icons-react';
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      className='theme-toggle p-1'
    >
      {theme === 'dark' ? (
        <IconSun stroke={1.5} className='h-6 w-6' />
      ) : (
        <IconMoonFilled className='h-6 w-6' />
      )}
    </button>
  );
};

export default ThemeToggle;
