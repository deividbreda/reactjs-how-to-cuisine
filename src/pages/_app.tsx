import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import '../styles/globals.scss';
import { ModalProvider } from '../hook/useModal';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider>
      <ModalProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ModalProvider>
    </SessionProvider>

  )
}

export default MyApp
