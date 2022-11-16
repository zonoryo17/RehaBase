import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabaseClient';
import ReactStars from 'react-stars';
import { Facility } from '../../types/facility';

const TopPageRanking = () => {
  const [topRankFacilities, setTopRankFacilities] = useState<Facility[] | null>(
    null
  );

  useEffect(() => {
    topRankingFacilities();
  }, []);

  const topRankingFacilities = async () => {
    try {
      let { data, error } = await supabase
        .from<Facility>('Facilities')
        .select('*, Reviews(id)')
        .order('total_rating_ave', { ascending: false })
        .limit(3);
      setTopRankFacilities(data);
      console.log('topRankingFacilities', data);
      if (error) throw error;
    } catch (error) {
      throw new Error('正しく情報を取得できませんでした');
    }
  };

  return (
    <>
      {topRankFacilities?.map(
        ({ id, name, address, image_url, total_rating_ave }) => (
          <Link href={`/facilities/${id}`} key={id}>
            <a>
              <Box
                border="solid 1px"
                alignItems="center"
                rounded="20px"
                boxShadow="md"
                py="3"
                px="5"
              >
                <Flex alignItems="center" justifyContent="center" mb="5">
                  <Image
                    alt="ランキングのアイコン"
                    w="50px"
                    src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/crown1.png?t=2022-11-13T01%3A35%3A27.458Z"
                  />
                  <Text fontSize="2xl" ml="5">
                    {name}
                  </Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <Image
                    src={image_url ? image_url : '/no_image.jpg'}
                    alt="施設の画像"
                    w="200px"
                    // h="200px"
                  />
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>所在地：</Th>
                          <Th>{address}</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>総合評価：</Td>
                          <Td textColor="yellow.400">
                            <Flex gap={1}>
                              {total_rating_ave}
                              <ReactStars
                                count={5}
                                size={14}
                                color2={'#ffd700'}
                                value={total_rating_ave}
                                edit={false}
                              />
                            </Flex>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>費用：</Td>
                          <Td textColor="yellow.400">★★★★★</Td>
                        </Tr>
                        <Tr>
                          <Td>接遇：</Td>
                          <Td textColor="yellow.400">★★★★★</Td>
                        </Tr>
                        <Tr>
                          <Td>設備：</Td>
                          <Td textColor="yellow.400">★★★★★</Td>
                        </Tr>
                        <Tr>
                          <Td>技術：</Td>
                          <Td textColor="yellow.400">★★★★★</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Flex>
              </Box>
            </a>
          </Link>
        )
      )}
    </>
  );
};

export default TopPageRanking;
