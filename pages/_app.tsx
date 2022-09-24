import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

import 'swiper/css/bundle'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
