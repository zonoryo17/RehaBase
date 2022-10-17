import { Flex, Link, Spacer } from '@chakra-ui/react';
import Image from 'next/image';

const Header = () => {
  return (
    <Flex px="8">
      <Link href="/">
        <Image
          src="/zonoworks.png"
          alt="サービスロゴ"
          objectFit="contain"
          width="300"
          height="100"
        />
      </Link>
      <Spacer />
      <Flex alignItems="center" gap="10" fontSize="xl">
        <Link href="/about" _hover={{ opacity: '0.7', transition: '0.4s' }}>
          ○○とは
        </Link>
        <Link href="/article" _hover={{ opacity: '0.7', transition: '0.4s' }}>
          記事
        </Link>
        <Link
          href="/facilities"
          _hover={{ opacity: '0.7', transition: '0.4s' }}
        >
          施設情報一覧
        </Link>
        <Link href="/login" _hover={{ opacity: '0.7', transition: '0.4s' }}>
          無料会員登録/ログイン
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
