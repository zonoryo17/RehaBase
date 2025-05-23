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
import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsArrowLeftCircle } from 'react-icons/bs';
import CreateReviewModal from '@components/models/reviews/createReviewModal';
import UploadReviewImage from '@components/models/reviews/uploadReviewImage';
import ReactStars from 'react-stars';
import { supabase } from '@utils/supabaseClient';
import type { Facility } from '@type/facility';
import DeleteFacilityButton from '@components/models/facilities/DeleteFacilityButton';
import UpdateFacilityButton from '@components/models/facilities/UpdateFacilityButton';
import UploadFacilityImage from '@components/models/facilities/UploadFacilityImage';
import { ReviewCard } from '@components/models/reviews/ReviewCard/reviewCard';

const FacilityDetailPage: React.FC = () => {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [totalRating, setTotalRating] = useState(0);

  const query = useRouter().query;
  const { facilityId } = query;

  useEffect(() => {
    if (facilityId) fetchFacility();
  }, [facilityId]);

  //Facility情報の詳細（シングルページ）取得処理
  const fetchFacility = async () => {
    try {
      const { data: facility, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('id', facilityId)
        .single();
      if (facility) {
        setFacility(facility);
      }
      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  if (!facility) return <p>loading...</p>;

  //施設の総合点の取得
  const getTotalRating = async () => {
    try {
      const { data, error } = await supabase
        .from('Reviews')
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

      if (error) throw error;
    } catch (error: unknown) {
      if (error instanceof Error) throw error;
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
      .eq('id', facilityId)
      .select();
  };

  return (
    <>
      <Head>
        <title>{facility.name}/RehaBase</title>
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
          <CreateReviewModal
            facilityName={facility.name}
            facilityId={facility.id ?? ''}
          />
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
            <Text fontSize="2xl">{facility.name}</Text>
            <Spacer />
            <>
              <UpdateFacilityButton facility={facility} />
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
                    <Text>病院名：{facility.name}</Text>
                    <Text>病院紹介：{facility.explanation}</Text>
                  </Box>
                </Flex>
                <Box>
                  <ReviewCard facilityId={facilityId} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Text>リハビリ内容一覧：{facility.menu}</Text>
              </TabPanel>
              <TabPanel>
                <Text>【費用目安】</Text>
                <Text>　{facility.price}</Text>
                <Text>【個別費用】</Text>
                {facility.menu2 && (
                  <Text>
                    　＜{facility.menu2}＞{facility.price2}
                  </Text>
                )}
                {facility.menu3 && (
                  <Text>
                    　＜{facility.menu3}＞{facility.price3}
                  </Text>
                )}
                {facility.menu4 && (
                  <Text>
                    　＜{facility.menu4}＞{facility.price4}
                  </Text>
                )}
                {facility.menu5 && (
                  <Text>
                    　＜{facility.menu5}＞{facility.price5}
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
                <p>住所：{facility.address}</p>
                <p>電話番号：{facility.phone_number}</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
};

export default FacilityDetailPage;
