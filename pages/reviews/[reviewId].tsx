import { Box, Button, Flex, Text } from '@chakra-ui/react';
import DeleteReviewButton from '@src/components/reviews/deleteReview';
import { supabase } from '@src/utils/supabaseClient';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Review } from '../../types/reviews';

const ReviewDetailPage: NextPage = () => {
  const [reviews, setReviews] = useState<Review>();

  const router = useRouter();
  const query = router.query;
  console.log(query);

  useEffect(() => {
    fetchReviewData();
  }, [query]);

  const fetchReviewData = async () => {
    try {
      const { data: reviews, error } = await supabase
        .from('Reviews')
        .select('*, Users(user_name)')
        .eq('id', String(query.reviewId))
        .single();
      setReviews(reviews);
      console.log(reviews);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    }
  };
  if (!reviews) return <div>Null</div>;
  const {
    id,
    created_at,
    title,
    content,
    total_rating,
    reception_rating,
    service_rating,
    expense_rating,
    equipment_rating,
    environment_rating,
  } = reviews;

  const facility_id = reviews.facility_id;

  return (
    <>
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
        maxW="70rem"
        mx="auto"
      >
        <Box mx="5">
          <Flex justify="space-between">
            <Text fontSize="xl">{reviews.Users.user_name}さんの口コミ</Text>
            <DeleteReviewButton />
          </Flex>
          <Box>
            <Text textColor="gray.400" mb="5">
              {created_at}投稿
            </Text>
            <Box>
              <Flex>
                <Text fontSize="xl" fontWeight="bold" mb="3">
                  総合評価：{total_rating}点　
                  <span style={{ color: '#FFD700' }}>★★★★★</span>
                </Text>
              </Flex>
              <Flex flexWrap="wrap" justify="space-between">
                <Box>
                  <Text>
                    接遇： {reception_rating}点
                    <span style={{ color: '#FFD700' }}> ★★★★★</span>
                  </Text>
                </Box>
                <Box>
                  <Text>
                    サービス内容：{service_rating}点
                    <span style={{ color: '#FFD700' }}> ★★★★★</span>
                  </Text>
                </Box>
                <Box>
                  <Text>
                    費用：{expense_rating}点
                    <span style={{ color: '#FFD700' }}> ★★★★★</span>
                  </Text>
                </Box>
                <Box>
                  <Text>
                    機器類の充実：{equipment_rating}点
                    <span style={{ color: '#FFD700' }}> ★★★★★</span>
                  </Text>
                </Box>
                <Box>
                  <Text>
                    環境：{environment_rating}点
                    <span style={{ color: '#FFD700' }}> ★★★★★</span>
                  </Text>
                </Box>
              </Flex>
              <Text borderBottom="1px solid black" my="5"></Text>
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

export default ReviewDetailPage;
