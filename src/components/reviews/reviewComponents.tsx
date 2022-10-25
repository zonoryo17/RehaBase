import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import reviewStyle from '../../../styles/review.module.css';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { Review } from '../../../types/reviews';
import ReactStars from 'react-stars';
import { Avatars } from '../../../types/avatars';

const ReviewComponents: React.FC = () => {
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [avatars, setAvatars] = useState<Avatars[] | null>([]);
  const [avatarUrls, setAvatarUrls] = useState<Avatars[] | null>([]);
  const router = useRouter();

  const fetchAvatars = async () => {
    // supabase DB photos のデータをすべて取得
    const { data } = await supabase.storage.from('avatars').list('usersIcon', {
      limit: 100,
      offset: 1,
    });
    setAvatars(data);
    console.log(avatars);
  };

  const fetchAvatarsUrl = async () => {
    avatars?.forEach((avatar) => {
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(`usersIcon/${avatar.name}`);
      console.log(avatar.name);
      console.log(data);
      setAvatarUrls([...(avatarUrls ?? []), data]);
      console.log(avatarUrls);
    });
  };

  useEffect(() => {
    fetchUserData();
    fetchAvatars();
    fetchAvatarsUrl();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: reviews, error } = await supabase
        .from<Review>('Reviews')
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
        reviews.map(({ id, title, content, total_rating, Users: user }) => (
          <Flex key={id} mt="5" h={36}>
            <Box>
              <Image
                src={`${avatarUrls?.publicURL}`}
                width="100"
                height="100"
                borderRadius={50}
              />
              <Text align="center">{user?.user_name}</Text>
            </Box>
            <Box
              border="1px solid"
              borderRadius="7"
              maxW="30rem"
              mx="4"
              px="5"
              pt="2"
              position="relative"
            >
              <Flex gap={5} align="center">
                <Text>{user?.prefecture}</Text>
                <Text>{user?.gender}</Text>
                <Text>{user?.age}歳</Text>
                <Flex align="center">
                  <Text>総合評価：{total_rating}点</Text>
                  <ReactStars
                    count={5}
                    size={20}
                    color2={'#ffd700'}
                    value={total_rating}
                    edit={false}
                  />
                </Flex>
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
