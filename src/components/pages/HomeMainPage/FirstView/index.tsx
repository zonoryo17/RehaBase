import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

const FirstView: FC = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const TopImage = supabase.storage
    .from('apps')
    .getPublicUrl('FirstViewImage.jpg');
  const TopDarkImage = supabase.storage
    .from('apps')
    .getPublicUrl('FirstViewImage-opc.png');

  // ダークモード用
  const btnColor = useColorModeValue('gray', 'blue');
  const inputBgColor = useColorModeValue('gray.100', 'blue.900');
  const topImage = useColorModeValue(
    TopImage.publicURL,
    TopDarkImage.publicURL
  );

  //検索機能の実装
  const handleSubmitSearch = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/facilities',
      query: { keyword: search },
    });
  };

  const handleChange = (e: { target: HTMLInputElement }) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Center>
        <Image src={topImage ?? ''} alt="トップイメージ" width="70%" />
      </Center>
      <Box
        p="10"
        position="absolute"
        top={{ base: '60%', md: '70%', lg: '60%' }}
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text
          fontSize={{
            base: 'xl',
            md: '2xl',
            lg: '4xl',
            xl: '5xl',
          }}
          textAlign="center"
          textColor="white"
          textShadow="3px 3px 4px #171717"
          mb={{ base: '10', md: '20', lg: '32' }}
          w={{ base: 230, md: 400, lg: 600 }}
        >
          あなたの声でつくる
          <br />
          リハビリ情報共有サイト
          <br />
          RehaBase
        </Text>
        <form onSubmit={handleSubmitSearch}>
          <Flex>
            <Input
              variant="outline"
              bg={inputBgColor}
              size={{ base: 'sm', lg: 'lg' }}
              type="text"
              placeholder="リハビリ施設を入力"
              value={search}
              onChange={handleChange}
              autoFocus
            />
            <Button
              type="submit"
              size={{ sm: 'sm', lg: 'lg' }}
              width="100px"
              ml="2"
              boxShadow="md"
              colorScheme={btnColor}
            >
              検索
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default FirstView;
