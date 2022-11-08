import { Flex, Image, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex p="5" bg="gray.100" width="100%" height="170px">
      <Link href="/">
        <Image src="/zonoworks.png" alt="サービスロゴ" width="56" height="50" />
      </Link>
      <Text m="auto" pr="32">
        &copy;RehaBase All right reserved
      </Text>
    </Flex>
  );
};

export default Footer;
