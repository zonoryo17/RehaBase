import { NextPage } from 'next';
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';

const FacilitiesListPage: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    if (query) searchQueryFacilities();
  }, []);

  const fetchData = async () => {
    try {
      const { data: facilities, error } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .order('created_at', { ascending: false });
      setFacilities(facilities);
      console.log(facilities);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClickCreateFacility = () => {
    router.push('/facilities/create');
  };

  //施設情報の検索機能
  const query = router.query; //検索フォームから入力されたキーワードを取得
  const { keyword } = query;
  const searchQueryFacilities = async () => {
    try {
      const { data: searchedValue, error } = await supabase
        .from('Facilities')
        .select()
        .like('name', `%${keyword}%`);
      setFacilities(searchedValue);
      if (error) {
        throw error;
      }
    } catch (error) {
      throw new Error('正しく施設情報を取得できませんでした');
    }
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        施設情報一覧
      </Text>
      <Button onClick={handleClickCreateFacility} ml={5}>
        施設情報を登録
      </Button>
      <Box maxW={600} mx="auto">
        <List>
          {facilities &&
            facilities.map(
              ({ id, name, address, phone_number, image_url }: Facility) => (
                <Link href={`/facilities/${id}`} key={id}>
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
                          <Text fontFamily="YuGothic">病院名：{name}</Text>
                          <Text fontFamily="YuGothic">住所：{address}</Text>
                          <Text fontFamily="YuGothic">
                            電話番号：{phone_number}
                          </Text>
                        </Box>
                      </Flex>
                    </ListItem>
                  </Box>
                </Link>
              )
            )}
        </List>
      </Box>
    </>
  );
};

export default FacilitiesListPage;
