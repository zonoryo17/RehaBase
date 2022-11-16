import { Box, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import NavMenuDrawer from './HeaderNavMenu';
import UserMenu from './profile/userMenu';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex px="8">
      <Link href="/">
        <a>
          <Image
            src="/zonoworks.png"
            alt="サービスロゴ"
            objectFit="contain"
            width="300"
            height="100"
          />
        </a>
      </Link>
      <Spacer />
      <Flex
        alignItems="center"
        gap="10"
        fontSize="xl"
        mr={3}
        display={{ sm: 'none', lg: 'none', xl: 'flex' }}
      >
        <Link href="/about">RehaBaseとは</Link>
        <Box opacity="0.4">記事</Box>
        <Link href="/facilities">施設情報一覧</Link>
        <Link href="/login">無料会員登録/ログイン</Link>
      </Flex>
      <Flex align="center" mx={3}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Change color mode"
          icon={
            colorMode === 'light' ? (
              <MdDarkMode size="1.4rem" />
            ) : (
              <MdLightMode size="1.3rem" />
            )
          }
        />
      </Flex>
      <Box display={{ lg: 'flex', xl: 'none' }} my="auto">
        <NavMenuDrawer />
      </Box>
      <UserMenu />
    </Flex>
  );
};

export default Header;
