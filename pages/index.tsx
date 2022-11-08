import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TopPageRanking from '@components/topPageRanking';
import Slider from '@components/topSlideShow';
import { supabase } from '@utils/supabaseClient';
import type { Session } from '@supabase/types';
import { useRouter } from 'next/router';

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
  const handleClickSearch = async () => {
    router.push({
      pathname: '/facilities',
      query: { keyword: search },
    });
  };

  return (
    <Box>
      {/* {session && ( */}
      <>
        <Box position="relative">
          <Image src="/topImage.jpg" alt="トップイメージ" width="100%" />
          <Box
            p="10"
            position="absolute"
            top="60%"
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
                onClick={handleClickSearch}
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
          </Box>
        </Box>
        <Box mt="10" px="10">
          <Text fontSize="3xl" fontWeight="bold" mb="5">
            総合ランキング
          </Text>
          <Flex gap="5">
            <TopPageRanking
              name="大阪病院"
              icon={'/crown1.jpg'}
              image={'/JCHO_Osaka_Hospital.jpg'}
              address={'大阪'}
            />
            <TopPageRanking
              name="東京病院"
              icon={'/crown2.jpg'}
              image={'/Tokyo_Hospital.jpg'}
              address={'東京'}
            />
            <TopPageRanking
              name="福岡病院"
              icon={'/crown3.jpg'}
              image={'/Fukuoka_Hospital.jpg'}
              address={'福岡'}
            />
          </Flex>
        </Box>
        <Slider />
      </>
      {/* )} */}
      {/* {!session && router.push('/login)' } */}
    </Box>
  );
};

export default Home;
