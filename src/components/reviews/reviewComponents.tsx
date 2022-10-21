import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import reviewStyle from '../../../styles/review.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '@src/utils/supabaseClient';
import { User } from '../../../types/user';
import { useRouter } from 'next/router';
import { Review } from '../../../types/reviews';
// import ReviewDetailModal from './reviewDetailModal';

const ReviewComponents = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: reviews, error } = await supabase
        .from('Reviews')
        .select('*, Users(id, user_name, gender, age, prefecture)');
      setReviews(reviews);
      console.log(reviews);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {reviews &&
        reviews.map(({ id, title, content, total_rating, Users }) => (
          <Flex key={id} mt="5" h={36}>
            <Box>
              <Image src="/noNameUser.jpg" width="100" height="100" />
              <Text align="center">{Users.user_name}</Text>
            </Box>
            <Box
              border="1px solid"
              borderRadius="7"
              maxW="30rem"
              mt="2"
              mx="4"
              px="5"
              pt="2"
              position="relative"
            >
              <Flex gap={5}>
                <Text>{Users.prefecture}</Text>
                <Text>{Users.gender}</Text>
                <Text>{Users.age}歳</Text>
                <Text>
                  総合評価：{total_rating}点
                  <span style={{ color: '#FFD700' }}> ★★★★★</span>
                </Text>
              </Flex>
              <Text
                w="30rem"
                pr="10"
                fontWeight="bold"
                textDecoration="underline"
              >
                {title}
              </Text>
              <Text className={reviewStyle.reviewContent} w="30rem" pr="10">
                {content}
              </Text>
              <Box position="absolute" right="0" bottom="0">
                {/* 口コミの詳細モーダル */}
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/reviews/${id}`)}
                >
                  詳細を見る
                </Button>
                {/* <ReviewDetailModal /> */}
              </Box>
            </Box>
          </Flex>
        ))}
    </>
  );
};

export default ReviewComponents;
