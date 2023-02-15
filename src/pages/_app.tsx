import '@/styles/globals.scss';
import '@/styles/dracula.scss';
import '../../public/iconfont/iconfont.css';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics mode={'production'} debug={false} />
    </ThemeProvider>
  );
}

export default MyApp;
