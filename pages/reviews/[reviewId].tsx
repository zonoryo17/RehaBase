import { Box, Button, Flex, Text } from '@chakra-ui/react';
import DeleteReviewButton from '@src/components/reviews/deleteReview';
import { supabase } from '@src/utils/supabaseClient';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ReactStars from 'react-stars';
import { Review } from '../../types/reviews';

const ReviewDetailPage: NextPage = () => {
  const [reviews, setReviews] = useState<Review | null>(null);

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
        .eq('id', query.reviewId)
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
    user_id,
  } = reviews;
  const user_name = reviews.Users?.user_name;

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
            <Text fontSize="xl">{user_name}さんの口コミ</Text>
            <DeleteReviewButton facility_id={facility_id ?? ''} />
          </Flex>
          <Box>
            <Text textColor="gray.400" mb="5">
              {created_at}投稿
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
