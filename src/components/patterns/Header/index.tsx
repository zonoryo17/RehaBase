import {
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import Link from 'next/link';
import NavMenuDrawer from '../Sidebar';
import UserMenu from '../../pages/profile/userMenu';
import { FC } from 'react';

const Header: FC = () => {
  //ダークモード用
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex mx={{ base: 3, lg: 10 }} my={{ base: 5, lg: 0 }}>
      <Link href="/">
        <a>
          <Image
            src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RehaBase.png?t=2022-11-19T14%3A36%3A32.712Z"
            alt="サービスロゴ"
            objectFit="contain"
            width={300}
          />
        </a>
      </Link>
      <Spacer />
      <Flex
        alignItems="center"
        gap="10"
        fontSize="xl"
        mr={3}
        display={{ base: 'none', xl: 'flex' }}
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
