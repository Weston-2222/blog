import MotionDiv from '@/components/framer/motion';
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
const Footer: React.FC = () => {
  return (
    <footer className='text-center w-full bg-foreground p-4'>
      <div className='flex justify-center gap-4 mt-2'>
        <nav className='flex gap-4 items-center'>
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
      </div>
      <p>© 2024 Weston. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
