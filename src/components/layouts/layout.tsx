import { Box } from '@chakra-ui/react';
import Footer from '@components/ui/Footer';
import Header from '@components/ui/Header';

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
