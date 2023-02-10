import '@/styles/globals.scss';
import '@/styles/dracula.scss';
import '../../public/iconfont/iconfont.css';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
