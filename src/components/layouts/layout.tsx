import { Box } from '@chakra-ui/react';
import Footer from '@components/patterns/Footer';
import Header from '@components/patterns/Header';

type Props = {
  children: React.ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
