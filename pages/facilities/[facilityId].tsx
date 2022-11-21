import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
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
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';
import { supabase } from '@utils/supabaseClient';
import DeleteFacilityButton from '@components/facilities/deleteFacility';
import UpdateFacilityModal from '@components/facilities/updateFacilityModal';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ReviewComponents from '@components/reviews/reviewComponents';
import CreateReviewModal from '@components/reviews/createReviewModal';
import UploadReviewImage from '@components/reviews/uploadReviewImage';
import UploadFacilityImage from '@components/facilities/uploadFacilityImage';
import { Review } from '../../types/reviews';
import ReactStars from 'react-stars';

// type RatingList = {
//   total_rating?: number;
//   reception_rating?: number;
//   service_rating?: number;
//   expence_rating?: number;
//   equipment_rating?: number;
//   environment_rating?: number;
// };

const FacilityDetailPage: NextPage = () => {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [totalRating, setTotalRating] = useState<Number>();

  const query = useRouter().query;
  const { facilityId } = query;

  useEffect(() => {
    if (facilityId) fetchFacility();
  }, [facilityId]);

  //Facility情報の詳細（シングルページ）取得処理
  const fetchFacility = async () => {
    try {
      const { data: facility, error } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .eq('id', facilityId)
        .single();
      if (facility) {
        setFacility(facility);
      }
      if (error) throw error;
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
    menu2,
    menu3,
    menu4,
    menu5,
    price,
    price2,
    price3,
    price4,
    price5,
    address,
    phone_number,
  } = facility;

  //施設の総合点の取得
  const getTotalRating = async () => {
    try {
      const { data, error } = await supabase
        .from<Review>('Reviews')
        .select(
          'total_rating, reception_rating, service_rating, expense_rating, equipment_rating, environment_rating'
        )
        .eq('facility_id', facilityId);
      //各項目の合計点を取得
      if (data) {
        // 総合評価平均値の取得
        const sumTotalRating = data.reduce((sum, element) => {
          return sum + element?.total_rating;
        }, 0);
        if (sumTotalRating > 0) {
          const totalRatingAve = sumTotalRating / data?.length;
          setTotalRating(Number(totalRatingAve.toFixed(1)));
        }
      }
      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      updateTotalRatingAve();
    }
  };
  getTotalRating();

  //総合得点平均値をFacilitiesテーブルに保存
  const updateTotalRatingAve = async () => {
    await supabase
      .from('Facilities')
      .update({ total_rating_ave: totalRating })
      .eq('id', facilityId);
  };

  return (
    <>
      <Head>
        <title>{name}/RehaBase</title>
      </Head>
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
          w="100%"
          maxW="1000px"
          h="100%"
          minH="30rem"
          mx="20px"
          my="30px"
          border="solid 1px"
          borderRadius="20px"
          boxShadow="md"
          position="relative"
        >
          <Heading display="flex" mt="10px" mb="5px" px="20px">
            <Text fontSize="2xl">{name}</Text>
            <Spacer />
            <>
              <UpdateFacilityModal facility={facility} />
              <DeleteFacilityButton />
            </>
          </Heading>
          <Tabs align="end" variant="enclosed" colorScheme="green">
            <Flex position="absolute" left="5">
              <Text fontSize="xl" mr={2}>
                総合評価：{Number(totalRating)}
              </Text>
              <ReactStars
                count={5}
                size={20}
                color2={'#ffd700'}
                value={Number(totalRating)}
                edit={false}
              />
            </Flex>
            <TabList>
              <Tab>概要</Tab>
              <Tab>内容</Tab>
              <Tab>費用</Tab>
              <Tab>写真</Tab>
              <Tab>住所</Tab>
            </TabList>
            <TabPanels textAlign="start">
              <TabPanel>
                <Flex>
                  <UploadFacilityImage />
                  <Box ml={5}>
                    <Text>病院名：{name}</Text>
                    <Text>病院紹介：{explanation}</Text>
                  </Box>
                </Flex>
                <Box>
                  <ReviewComponents facilityId={facilityId} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Text>リハビリ内容一覧：{menu}</Text>
              </TabPanel>
              <TabPanel>
                <Text>【費用目安】</Text>
                <Text>　{price}</Text>
                <Text>【個別費用】</Text>
                {menu2 && (
                  <Text>
                    　＜{menu2}＞{price2}
                  </Text>
                )}
                {menu3 && (
                  <Text>
                    　＜{menu3}＞{price3}
                  </Text>
                )}
                {menu4 && (
                  <Text>
                    　＜{menu4}＞{price4}
                  </Text>
                )}
                {menu5 && (
                  <Text>
                    　＜{menu5}＞{price5}
                  </Text>
                )}
              </TabPanel>
              <TabPanel>
                <Box>
                  <Text>写真</Text>
                  {/* 画像ファイルアップデート用コンポーネント */}
                  <UploadReviewImage facilityId={facilityId} />
                </Box>
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
