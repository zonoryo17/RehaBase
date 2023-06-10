import { Box } from '@chakra-ui/react';
import Footer from '../patterns/Footer';
import Header from '../patterns/Header';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
