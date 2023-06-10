import { NextPage } from 'next';
import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';
import ReactStars from 'react-stars';

const FacilitiesListPage: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[] | null>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    fetchData();
    if (query.keyword) searchQueryFacilities();
    if (user) setIsLoggedIn(true);
  }, []);

  const fetchData = async () => {
    try {
      const { data: facilities, error } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .order('total_rating_ave', { ascending: false });
      setFacilities(facilities);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClickCreateFacility = () => {
    router.push('/facilities/create');
  };

  //施設情報の検索機能
  const query = router.query; //検索フォームから入力されたキーワードをクエリで取得
  const { keyword } = query;
  const searchQueryFacilities = async () => {
    try {
      const { data: searchedValue, error } = await supabase
        .from('Facilities')
        .select()
        .like('name', `%${keyword}%`);
      setFacilities(searchedValue);
      if (searchedValue?.length === 0) {
        toast({
          title: '検索された施設は見つかりませんでした。',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      throw new Error('正しく施設情報を取得できませんでした');
    }
  };

  return (
    <>
      <Head>
        <title>施設情報一覧/RehaBase</title>
      </Head>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        施設情報一覧
      </Text>
      {isLoggedIn && (
        <Button onClick={handleClickCreateFacility} ml={5}>
          施設情報を登録
        </Button>
      )}
      {!isLoggedIn && (
        <Button
          ml={5}
          onClick={() =>
            toast({
              title: 'ログインされていない場合、施設情報の削除はできません',
              status: 'error',
              duration: 6000,
              position: 'top',
              isClosable: true,
            })
          }
        >
          施設情報を登録
        </Button>
      )}
      <Box maxW={600} mx="auto">
        <Suspense fallback={<p>Now Loading...</p>}>
          <List>
            {facilities &&
              facilities.map(
                ({
                  id,
                  name,
                  address,
                  phone_number,
                  image_url,
                  total_rating_ave,
                }: Facility) => (
                  <Link href={`/facilities/${id}`} key={id}>
                    <a>
                      <Box
                        border="1px solid"
                        borderRadius="5px"
                        minH={100}
                        my={5}
                        boxShadow="md"
                        _hover={{
                          transform: 'scale(1.03, 1.03)',
                          transition: '0.3s',
                        }}
                      >
                        <ListItem>
                          <Flex>
                            <Box m={1}>
                              <Image
                                src={image_url ? image_url : '/no_image.jpg'}
                                w={200}
                                h={150}
                                objectFit="contain"
                              />
                            </Box>
                            <Box mt={2} ml={2}>
                              <Text fontFamily="YuGothic" fontWeight="bold">
                                病院名：{name}
                              </Text>
                              <Flex align="center">
                                <Text mr={2}>総合評価：{total_rating_ave}</Text>
                                <ReactStars
                                  count={5}
                                  size={20}
                                  color2={'#ffd700'}
                                  value={total_rating_ave}
                                  edit={false}
                                />
                              </Flex>
                              <Text borderBottom="1px solid" w="100%" my={2} />
                              <Text fontFamily="YuGothic">住所：{address}</Text>
                              <Text fontFamily="YuGothic">
                                電話番号：{phone_number}
                              </Text>
                            </Box>
                          </Flex>
                        </ListItem>
                      </Box>
                    </a>
                  </Link>
                )
              )}
            {!facilities && <Text>施設情報が見つかりませんでした</Text>}
          </List>
        </Suspense>
      </Box>
    </>
  );
};

export default FacilitiesListPage;
