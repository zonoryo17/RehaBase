import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import TopPageRanking from '@components/topPageRanking';
import { supabase } from '@utils/supabaseClient';
import type { Session } from '@supabase/types';
import TopSlideShow from '@components/topSlideShow';

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [search, setSearch] = useState<string>('');
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
      {/* {session && ( */}
      <Box>
        <Box position="relative">
          <Center>
            <Image
              src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/stock-vector-volunteers-helping-disabled-people-group-of-men-and-women-with-special-needs-on-wheelchair-with-1715889676.jpg?t=2022-11-18T08%3A48%3A36.740Z"
              alt="トップイメージ"
              width="70%"
            />
          </Center>
          <Box
            p="10"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Text
              fontSize="5xl"
              textAlign="center"
              textColor="white"
              textShadow="3px 3px 4px #171717"
              mb="32"
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
                  size="lg"
                  width="80vh"
                  textColor="white"
                  type="text"
                  placeholder="リハビリ施設を入力"
                  value={search}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  size="lg"
                  width="100px"
                  ml="2"
                  boxShadow="md"
                  _hover={{
                    boxShadow: 'none',
                    transition: '0.4s',
                    bg: 'gray.300',
                  }}
                >
                  検索
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
        <Box mt="10" px="10">
          <Text fontSize="3xl" fontWeight="bold" mb="5">
            総合ランキング
          </Text>
          <Flex gap="5">
            <TopPageRanking />
          </Flex>
        </Box>
        <TopSlideShow />
      </Box>
      {/* )} */}
      {/* {!session && router.push('/about')} */}
    </>
  );
};

export default Home;
