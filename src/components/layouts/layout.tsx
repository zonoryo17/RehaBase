import { Box } from '@chakra-ui/react';
import Footer from '@components/patterns/Footer';
import Header from '@components/patterns/Header';

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
