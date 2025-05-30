import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import DeleteReviewButton from '@components/models/reviews/DeleteReviewButton';
import { supabase } from '@utils/supabaseClient';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ReactStars from 'react-stars';
import dayjs from 'dayjs';
import type { Review } from '@type/reviews';
import { UserDataContext } from '@pages/_app';

const ReviewsDetailPage: React.FC = () => {
  const [review, setReview] = useState<Review | null>(null);

  const query = useRouter().query;
  const userData = useContext(UserDataContext);

  useEffect(() => {
    fetchReviewData();
  }, []);

  //レビューの詳細情報を取得
  const fetchReviewData = async () => {
    try {
      const { data: review, error } = await supabase
        .from('Reviews')
        .select('*, Users(user_name, age, gender, prefecture, avatar_url)')
        .eq('id', query.reviewId)
        .single();
      setReview(review);
      if (error) console.log('error', error);
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  if (!review) return null;
  const {
    created_at,
    title,
    content,
    total_rating,
    reception_rating,
    service_rating,
    expense_rating,
    equipment_rating,
    environment_rating,
    facility_id,
  } = review;

  const reviewUser = review.Users; //レビューを投稿したユーザー情報
  if (!reviewUser) return <div>Non User</div>;
  const { user_name, age, gender, prefecture, avatar_url } = reviewUser;

  return (
    <>
      <Head>
        <title>{user_name}さんの口コミ/RehaBase</title>
      </Head>
      <Link href={`/facilities/${facility_id}`}>
        <Button ml="32" my="10">
          {/*戻るボタンのアイコン */}
          <BsArrowLeftCircle />
          <Text ml="5px">施設情報へ戻る</Text>
        </Button>
      </Link>
      <Box
        border="1px solid"
        borderRadius={10}
        px={5}
        py={5}
        mt={10}
        mb={32}
        maxW={1200}
        minH={500}
        mx="auto"
      >
        <Box mx="5">
          <Flex justify="space-between">
            <Flex align="center">
              <Image
                src={
                  avatar_url
                    ? avatar_url
                    : 'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/avatars/usersIcon/noNameUser.png'
                }
                w={100}
                h={100}
                rounded="full"
              />
              <Flex direction="column" ml={3}>
                <Text fontSize="xl">{user_name}さんの口コミ</Text>
                <Flex fontSize="xl" gap={4}>
                  <Text>{age ? `${age}歳` : ''}</Text>
                  <Text>{gender === '選択しない' ? '性別未設定' : gender}</Text>
                  <Text>{prefecture}</Text>
                </Flex>
              </Flex>
            </Flex>
            {/* 口コミ削除コンポーネント　投稿者のみ表示 */}
            {review.auth_id === userData?.userData?.id && (
              <DeleteReviewButton facility_id={facility_id ?? ''} />
            )}
          </Flex>
          <Box>
            <Text textColor="gray.400" mb={5} ml={5}>
              {dayjs(created_at).format('YYYY年MM月DD日 HH時mm分')}　投稿
            </Text>
            <Box>
              <Flex align="center" mb={3}>
                <Text fontSize="xl" fontWeight="bold" mr={2}>
                  総合評価：{total_rating}
                </Text>
                <ReactStars
                  count={5}
                  size={30}
                  color2={'#ffd700'}
                  value={total_rating}
                  edit={false}
                />
              </Flex>
              <Flex flexWrap="wrap" gap={8}>
                <Flex align="center">
                  <Text mr={2}>接遇： {reception_rating}</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={reception_rating}
                    edit={false}
                  />
                </Flex>
                <Flex align="center">
                  <Text mr={2}>サービス内容：{service_rating}</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={service_rating}
                    edit={false}
                  />
                </Flex>
                <Flex align="center">
                  <Text mr={2}>費用：{expense_rating}</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={expense_rating}
                    edit={false}
                  />
                </Flex>
                <Flex align="center">
                  <Text mr={2}>機器類の充実：{equipment_rating}</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={equipment_rating}
                    edit={false}
                  />
                </Flex>
                <Flex align="center">
                  <Text mr={2}>環境：{environment_rating}</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={environment_rating}
                    edit={false}
                  />
                </Flex>
              </Flex>
              <Text borderBottom="1px solid black" my="5" />
              <Text fontSize="xl" fontWeight="bold" mb="3">
                {title}
              </Text>
              <Text fontSize="lg">{content}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReviewsDetailPage;
