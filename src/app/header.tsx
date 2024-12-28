import FloatUp from '../components/framer/floatUp';
import ThemeToggle from '@/components/themeToggle';
import { IconBrandGithubFilled, IconClipboardText } from '@tabler/icons-react';
import Link from 'next/link';

const headerLink = [
  {
    name: 'Resume',
    href: '/resume',
    node: (
      <Link key='resume' href='/resume' className='p-1 flex items-center gap-1'>
        <IconClipboardText className='h-5 w-5' />
        Resume
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
        className='flex items-center gap-1 p-1'
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
      <div className='w-[752px]'>
        <div className='mx-auto py-1 px-2 flex justify-between items-center'>
          {/* Logo */}
          <div className='text-xl font-bold p-2'>
            <Link href='/' className='hover:underline'>
              Weston&apos;s Blog
            </Link>
          </div>

          {/* Navigation */}
          <nav className='flex gap-4 items-center'>
            {headerLink.map((link) => (
              <FloatUp key={link.name}>{link.node}</FloatUp>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className='p-2'>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
