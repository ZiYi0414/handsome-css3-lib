import '../styles/globals.scss';
import '../../public/iconfont/iconfont.css';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
