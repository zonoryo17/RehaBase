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
    <Flex
      justify={{ base: 'center', xl: 'space-between' }}
      wrap={{ base: 'wrap', xl: 'nowrap' }}
    >
      {topRankFacilities?.map(
        (
          { id, name, prefecture, image_url, phone_number, total_rating_ave },
          i
        ) => (
          <Link href={`/facilities/${id}`} key={i}>
            <a>
              <Box
                border="solid 1px"
                alignItems="center"
                rounded="20px"
                boxShadow="md"
                maxW={{ base: 410, md: 450, lg: 500 }}
                minW={{ base: 240, md: 300, lg: 420 }}
                h={{ sm: 200, md: 240, lg: 260 }}
                mx={{ base: 0, lg: 2 }}
                mb={3}
                py={3}
                px={3}
              >
                <Flex alignItems="center" justifyContent="center" mb="5">
                  {i === 0 && (
                    <Image
                      alt="ランキングのアイコン"
                      w={{ base: '40px', md: '50px' }}
                      rounded="10"
                      src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/crown1-opc.png?t=2022-11-19T11%3A39%3A02.631Z"
                    />
                  )}
                  {i === 1 && (
                    <Image
                      alt="ランキングのアイコン"
                      w={{ base: '40px', md: '50px' }}
                      rounded="10"
                      src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/crown2-opc.png"
                    />
                  )}
                  {i === 2 && (
                    <Image
                      alt="ランキングのアイコン"
                      w={{ base: '40px', md: '50px' }}
                      rounded="10"
                      src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/crown3-opc.png?t=2022-11-19T11%3A39%3A17.802Z"
                    />
                  )}
                  <Text fontSize={{ base: 'lg', md: '2xl' }} ml="5">
                    {name}
                  </Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <Image
                    src={image_url ? image_url : '/no_image.jpg'}
                    alt="施設の画像"
                    w={{ base: 100, md: 150, lg: 200 }}
                    // h="200px"
                  />
                  <TableContainer>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>総合評価：</Th>
                          <Th textColor="yellow.400" px={0}>
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
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>所在地：</Td>
                          <Td px={0}>{prefecture}</Td>
                        </Tr>
                        <Tr>
                          <Td>電話番号：</Td>
                          <Td px={0}>{phone_number}</Td>
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
    </Flex>
  );
};

export default TopPageRanking;
