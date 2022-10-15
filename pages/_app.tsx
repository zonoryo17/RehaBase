import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Layout from '../src/components/layout';

import 'swiper/css/bundle';

import 'swiper/css/bundle';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
