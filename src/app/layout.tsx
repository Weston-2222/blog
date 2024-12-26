import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import Header from './header';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='zh-TW' suppressHydrationWarning>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Weston&apos;s Blog</title>
      </head>

      <body>
        <ThemeProvider attribute='class'>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
