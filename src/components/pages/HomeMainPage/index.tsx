import { Box, Skeleton, Text } from '@chakra-ui/react';
import FirstView from '@components/pages/HomeMainPage/FirstView';
import Head from 'next/head';
import { type FC, Suspense } from 'react';
import TopPageRanking from './topPageRanking';
import TopSlideShow from './topSlideShow';

const HomeMainPage: FC = () => {
  return (
    <>
      <Head>
        <title>RehaBase</title>
      </Head>
      <Box>
        <Box position="relative">
          <Suspense fallback={<Skeleton height={300} />}>
            <FirstView />
          </Suspense>
        </Box>
        <Box mt="10" px={{ base: 5, md: 10 }}>
          <Text fontSize={{ base: 'xl', lg: '3xl' }} fontWeight="bold" mb="5">
            総合ランキング
          </Text>
          <TopPageRanking />
        </Box>
        <TopSlideShow />
      </Box>
    </>
  );
};

export default HomeMainPage;
