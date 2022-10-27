import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';
import { supabase } from '@src/utils/supabaseClient';
import DeleteFacilityButton from '@src/components/deleteFacility';
import UpdateFacilityModal from '@src/components/updateFacilityModal';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ReviewComponents from '@src/components/reviews/reviewComponents';
import CreateReviewModal from '@src/components/reviews/createReviewModal';

const FacilityDetailPage: NextPage = () => {
  const [facility, setFacility] = useState<Facility | null>(null);

  const router = useRouter();
  const query = router.query;

  const user = supabase.auth.user();

  useEffect(() => {
    fetchFacility();
  }, [query]);

  //Facility情報の詳細（シングルページ）取得処理
  const fetchFacility = async () => {
    try {
      const { data: facility } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .eq('id', query.facilityId)
        .single();
      if (facility) {
        setFacility(facility);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!facility) return <div></div>;
  const {
    id,
    name,
    explanation,
    menu,
    price,
    address,
    phone_number,
    image_url,
  } = facility;

  return (
    <>
      <Flex>
        <Link href="/facilities">
          <Button ml="32" mt="10">
            {/*戻るボタンのアイコン */}
            <BsArrowLeftCircle />
            <Text ml="5px">施設一覧へ戻る</Text>
          </Button>
        </Link>
        <Spacer />
        <Box mr="20%" mt="10">
          <CreateReviewModal facilityName={name} facilityId={id ?? ''} />
        </Box>
      </Flex>
      <Center>
        <Box
          w="1000px"
          h="100%"
          minH="30rem"
          my="30px"
          border="solid 1px"
          borderRadius="20px"
          boxShadow="md"
        >
          <Heading display="flex" mt="10px" mb="5px" px="20px">
            <Text fontSize="2xl">{name}</Text>
            <Spacer />
            {/* ログインしているユーザーのみに施設情報の更新・削除ボタンを表示 */}
            {facility.auth_id === user?.id && (
              <>
                <UpdateFacilityModal facility={facility} />
                <DeleteFacilityButton />
              </>
            )}
          </Heading>
          <Tabs align="end" variant="enclosed" colorScheme="green">
            <TabList>
              <Tab>概要</Tab>
              <Tab>内容</Tab>
              <Tab>費用</Tab>
              <Tab>写真</Tab>
              <Tab>地図</Tab>
            </TabList>
            <TabPanels textAlign="start">
              <TabPanel>
                <Flex>
                  {image_url ? (
                    <Image src={facility?.image_url} w={300} />
                  ) : (
                    <Image src="/no_image.jpg" w={300} />
                  )}
                  <Box>
                    <Text>病院名：{name}</Text>
                    <Text>病院紹介：{explanation}</Text>
                  </Box>
                </Flex>

                <Box>
                  <ReviewComponents />
                </Box>
              </TabPanel>
              <TabPanel>
                <p>リハビリ内容：{menu}</p>
              </TabPanel>
              <TabPanel>
                <p>費用：{price}</p>
              </TabPanel>
              <TabPanel>
                <p>写真</p>
              </TabPanel>
              <TabPanel>
                <p>住所：{address}</p>
                <p>電話番号：{phone_number}</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
};

export default FacilityDetailPage;
