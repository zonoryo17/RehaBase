import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Layout from '../src/components/layout'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
