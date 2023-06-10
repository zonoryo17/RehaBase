import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Suspense, useEffect, useState } from 'react';
import TopPageRanking from '@components/topPageRanking';
import { supabase } from '@utils/supabaseClient';
import type { Session } from '@supabase/types';
import TopSlideShow from '@components/topSlideShow';

const Home: NextPage = () => {
  // ダークモード用
  const btnColor = useColorModeValue('gray', 'blue');
  const inputBgColor = useColorModeValue('gray.100', 'blue.900');
  const topImage = useColorModeValue(
    'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/FirstViewImage.jpg?t=2022-11-19T11%3A49%3A47.568Z',
    'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/FirstViewImage-opc.png?t=2022-11-19T11%3A49%3A19.124Z'
  );

  const [session, setSession] = useState<Session | null>(null);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleChange = (e: { target: HTMLInputElement }) => {
    setSearch(e.target.value);
  };

  //検索機能の実装
  const handleSubmitSearch = async (e: any) => {
    e.preventDefault();
    router.push({
      pathname: '/facilities',
      query: { keyword: search },
    });
  };

  return (
    <>
      <Head>
        <title>RehaBase</title>
      </Head>
      <Box>
        <Box position="relative">
          <Center>
            <Image src={topImage} alt="トップイメージ" width="70%" />
          </Center>
          <Suspense fallback={<p>Loading...</p>}>
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
          </Suspense>
        </Box>
        <Box mt="10" px={{ base: 5, md: 10 }}>
          <Text fontSize={{ base: 'xl', lg: '3xl' }} fontWeight="bold" mb="5">
            総合ランキング
          </Text>
          <TopPageRanking />
        </Box>
        <TopSlideShow />
      </Box>
    </>
  );
};

export default Home;
