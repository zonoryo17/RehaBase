import { Box } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

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
