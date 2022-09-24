import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box, Text } from '@chakra-ui/react';

SwiperCore.use([Pagination, Navigation]);

const images = ['/number_1.jpg', '/number_2.jpg', '/number_3.jpg', '/number_4.jpg', '/number_5.jpg'];

const Slider = () => {
  return (
    <Box mt="20" px="10">
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
        {images.map((src: string, index: number) => {
          return (
            <SwiperSlide key={`${index}`}>
              <Image src={src} layout="responsive" width={200} height={100} alt="test_image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Slider;
