import { ThemeProvider } from '@/components/theme-provider';
import { Noto_Sans_TC } from 'next/font/google';
import '@/styles/globals.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import PageTransitionEffect from '@/components/framer/pageTransitionEffect';
import { cn } from '@/lib/utils';
const notoSans = Noto_Sans_TC({
  subsets: ['latin'], // 選擇需要的字集，可選 'latin', 'latin-ext', 'cyrillic', 等
  weight: ['400', '700'], // 加載需要的字重
});
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='zh-TW' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body
        className={cn('min-h-screen flex flex-col w-full', notoSans.className)}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header className='fixed top-0 left-0 w-full z-10 h-[56px] bg-foreground backdrop-blur-sm' />
          <main className='flex-grow flex flex-col items-center w-full min-h-[calc(100vh-56px)] pt-[56px]'>
            <PageTransitionEffect>{children}</PageTransitionEffect>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
