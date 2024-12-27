'use client';
import FloatUp from '../components/framer/floatUp';
import ThemeToggle from '@/components/themeToggle';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import Link from 'next/link';

const headerLink = [
  {
    name: 'Resume',
    href: '/resume',
    node: (
      <Link key='resume' href='/resume'>
        Resume{' '}
      </Link>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/weston-lin',
    node: (
      <a
        key='github'
        target='_blank'
        href='https://github.com/weston-2222'
        className='flex items-center gap-1'
      >
        <IconBrandGithubFilled className='w-5 h-5' />
        GitHub
      </a>
    ),
  },
];

const Header = () => {
  return (
    <header className='flex justify-center w-full bg-foreground'>
      <div className='w-[768px]'>
        <div className='mx-auto px-4 py-3 flex justify-between items-center'>
          {/* Logo */}
          <div className='text-xl font-bold'>
            <Link href='/' className='hover:underline'>
              Weston&apos;s Blog
            </Link>
          </div>

          {/* Navigation */}
          <nav className='flex space-x-16'>
            {headerLink.map((link) => (
              <FloatUp key={link.name}>{link.node}</FloatUp>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
