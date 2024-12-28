import { ThemeProvider } from '@/components/theme-provider';
import { Noto_Sans_TC } from 'next/font/google';
import 'tailwindcss/tailwind.css';
import './globals.css';
import Header from './header';
import Footer from './footer';
import PageTransitionEffect from '@/components/framer/pageTransitionEffect';

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
        <title>Weston&apos;s Blog</title>
      </head>

      <body className={notoSans.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main className='flex flex-col items-center'>
            <Header />
            <PageTransitionEffect>
              <div className='max-w-2xl p-6'>{children}</div>
            </PageTransitionEffect>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
