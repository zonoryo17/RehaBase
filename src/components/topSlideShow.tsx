import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box, Text } from '@chakra-ui/react';

SwiperCore.use([Pagination, Navigation]);

const imagePaths = [
  '/number_1.jpg',
  '/number_2.jpg',
  '/number_3.jpg',
  '/number_4.jpg',
  '/number_5.jpg',
];

const TopSlideShow = () => {
  return (
    <Box mt={20} mx={5} position="relative">
      <Box
        w="100%"
        h="100%"
        bg="gray.300"
        rounded={5}
        position="absolute"
        top="0"
        opacity="0.5"
        zIndex={10}
      ></Box>
      <Text
        position="absolute"
        top="50%"
        left="50%"
        zIndex={15}
        fontSize={{ sm: '2xl', lg: '5xl' }}
      >
        準備中...
      </Text>
      <Text fontSize="3xl" fontWeight="bold" mb="5">
        ブログ記事
      </Text>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        navigation
        loop={true}
      >
        {imagePaths.map((src: string, index: number) => {
          return (
            <SwiperSlide key={`${index}`}>
              <Image
                src={src}
                layout="responsive"
                width={200}
                height={100}
                alt="test_image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default TopSlideShow;
