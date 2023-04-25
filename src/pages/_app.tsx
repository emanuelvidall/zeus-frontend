import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUser);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
