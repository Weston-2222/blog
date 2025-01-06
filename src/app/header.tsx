import NavBarMenu from '@/components/navBarMenu';

import ThemeToggle from '@/components/themeToggle';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { FileUser } from 'lucide-react';
import MotionDiv from '@/components/framer/motion';

const headerLink = [
  {
    name: 'Resume',
    href: '/resume',
    node: (
      <Link key='resume' href='/resume' className='p-1 flex items-center gap-1'>
        <FileUser className='h-5 w-5' />
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

const Header = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <header className='flex justify-center w-full '>
        <div className='w-[752px] py-1 px-2 flex justify-between items-center'>
          {/* Logo */}
          <Link href='/' className='text-xl font-bold p-2 hover:underline'>
            Weston&apos;s Blog
          </Link>

          {/* Navigation */}
          <nav className='hidden sm:flex gap-4 items-center'>
            {headerLink.map((link) => (
              <MotionDiv
                key={link.name}
                className={'rounded-lg cursor-pointer text-center'}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {link.node}
              </MotionDiv>
            ))}
          </nav>

          <div className='flex items-center gap-2'>
            {/* Mobile Menu */}
            <NavBarMenu className='sm:hidden' menuBarList={headerLink} />

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
