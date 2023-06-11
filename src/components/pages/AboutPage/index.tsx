import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { FC, Suspense } from 'react';
import { useAboutPage } from './useAboutPage';

const AboutPage: FC = () => {
  //ダークモードの背景，テキストの設定
  const bgColor = useColorModeValue('gray.700', 'gray.200');
  const cordBgColor = useColorModeValue('whiteAlpha.900', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.700');

  const {
    AboutTopImage,
    FeaturesImage,
    TargetImage,
    ManImage,
    Man2_Image,
    WomanImage,
    Woman2_Image,
    handleClick,
  } = useAboutPage();
  return (
    <>
      <Head>
        <title>RehaBaseとは</title>
      </Head>
      <Flex direction="column" align="center">
        <Suspense fallback={<Skeleton height="500px" />}>
          <Flex
            position="relative"
            justify="center"
            w="100%"
            mt={{ base: 0, md: 20 }}
          >
            <Image
              src={AboutTopImage ?? ''}
              alt="トップイメージ"
              w={{ base: '80%', md: '50%' }}
              rounded="20"
            />
            <Box
              p="10"
              position="absolute"
              top={{ base: '90%', sm: '60%' }}
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Text
                fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}
                textAlign="center"
                textColor="orange.200"
                textShadow="4px 4px 5px #171717"
                mb="32"
              >
                What's
                <br />
                RehaBase
              </Text>
            </Box>
          </Flex>
        </Suspense>
        <Flex display="column" my="10" textAlign="center">
          <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }} my={5}>
            RehaBaseについて
          </Text>
          <Box fontSize={{ base: 'sm', md: 'xl' }}>
            <Text mt={4} mb={2}>
              RehaBaseはリハビリ情報を共有する
            </Text>
            <Text mb={7}>口コミ型のリハビリ施設検索サービスです。</Text>
            <Text my={4}>「リハビリの情報を探すならここ！」</Text>
            <Text my={4}>そんなリハビリに関連する情報のプラットホームを</Text>
            <Text my={4}>あなたの「声」を借りて作ります。</Text>
          </Box>
          <Text
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '3xl' }}
            mt={20}
            mb={10}
          >
            こんなお悩みありませんか？
          </Text>
          <Grid gap={3} maxW={600} mx={{ base: 5, md: 0 }}>
            <Flex align="center">
              <Image
                src={ManImage ?? ''}
                w={{ base: 20, md: 100 }}
                h={{ base: 20, md: 100 }}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={{ base: 3, md: 5 }}
                mx={5}
                fontSize={{ base: 'sm', md: 'xl' }}
                textAlign="left"
                shadow="md"
              >
                「ここいいよ！」と言われて行ってみたけど、マッサージをされて終わった。
              </Text>
            </Flex>
            <Flex align="center">
              <Image
                src={Man2_Image ?? ''}
                w={{ base: 20, md: 100 }}
                h={{ base: 20, md: 100 }}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={{ base: 3, md: 5 }}
                mx={5}
                fontSize={{ base: 'sm', md: 'xl' }}
                textAlign="left"
                shadow="md"
              >
                もうすぐ退院するけど、帰ってからどこでリハビリをしたらいいかわからない
              </Text>
            </Flex>
            <Flex align="center">
              <Image
                src={WomanImage ?? ''}
                w={{ base: 20, md: 100 }}
                h={{ base: 20, md: 100 }}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={{ base: 5, md: 9 }}
                mx={5}
                w="100%"
                fontSize={{ base: 'sm', md: 'xl' }}
                textAlign="left"
                shadow="md"
              >
                どこでどんなリハビリが受けられるのかよくわからない
              </Text>
            </Flex>
            <Flex align="center">
              <Image
                src={Woman2_Image ?? ''}
                w={{ base: 20, md: 100 }}
                h={{ base: 20, md: 100 }}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={{ base: 3, md: 5 }}
                mx={5}
                fontSize={{ base: 'sm', md: 'xl' }}
                textAlign="left"
                shadow="md"
              >
                実際に行こうと思ってるリハビリ施設でリハビリを受けた人の感想が聞いてみたい
              </Text>
            </Flex>
          </Grid>
        </Flex>
        <Text
          fontSize={{ base: 'xl' }}
          display={{ base: 'block', md: 'none' }}
          fontWeight="bold"
          mt={4}
          textShadow="2px 2px 4px #CCCCCC"
        >
          そんな様々なお悩みから
        </Text>
        <Text
          fontSize={{ base: 'xl' }}
          display={{ base: 'block', md: 'none' }}
          fontWeight="bold"
          mb={20}
          textShadow="2px 2px 4px #CCCCCC"
        >
          生まれたサービスです！
        </Text>
        <Text
          fontSize={{ base: 'xl', md: '3xl' }}
          display={{ base: 'none', md: 'block' }}
          fontWeight="bold"
          my={20}
          textShadow="2px 2px 4px #CCCCCC"
        >
          そんな様々なお悩みから生まれたサービスです！
        </Text>
        <Flex
          direction="column"
          align="center"
          bg={bgColor}
          textColor={textColor}
          w="100%"
          pt={10}
          pb={20}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '3xl' }}
            mt={{ base: 0, md: 5 }}
            mb={{ base: 8, md: 14 }}
          >
            RehaBaseの特徴
          </Text>
          <Flex
            align="center"
            gap={5}
            justify="center"
            direction={{ base: 'column-reverse', md: 'row' }}
          >
            <UnorderedList fontSize={{ base: 'sm', md: 'xl' }} spacing={2}>
              <ListItem>気になるリハビリ施設を検索できる！</ListItem>
              <ListItem>リハビリ施設のリアルな評価がわかる！</ListItem>
              <ListItem>受けたリハビリの口コミを投稿できる！</ListItem>
              <ListItem>みんなでいいリハビリ施設の情報を共有できる！</ListItem>
            </UnorderedList>
            <Image
              src={FeaturesImage ?? ''}
              w={{ base: '85%', md: '45%' }}
              rounded="5"
            />
          </Flex>
        </Flex>
        <Text
          fontWeight="bold"
          fontSize={{ base: 'xl', md: '3xl' }}
          mb={5}
          mt={{ base: 10, md: 14 }}
        >
          RehaBaseの使用対象者
        </Text>
        <Flex
          justify="center"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          w="100%"
          mt={{ base: 3, md: 10 }}
          mb={{ base: 10, md: 20 }}
          gap={5}
        >
          <Image
            src={TargetImage ?? ''}
            w={{ base: '80%', md: '45%' }}
            rounded="5"
          />
          <UnorderedList
            fontSize={{ base: 'sm', md: 'xl' }}
            spacing={2}
            ml={{ base: 14, md: 6 }}
            mr={{ base: 8, md: 6 }}
          >
            <ListItem>これからリハビリを受けようと考えている方</ListItem>
            <ListItem>リハビリ施設でリハビリを受けられた方</ListItem>
            <ListItem>
              家族や友人がリハビリを受けた/受けようとされている方
            </ListItem>
            <ListItem>
              リハビリ施設への転職を考えており、実際の患者満足度等を知りたい方
            </ListItem>
          </UnorderedList>
        </Flex>
        <Flex
          bg={bgColor}
          w="100%"
          pb={20}
          justify="center"
          align="center"
          direction="column"
          textAlign="center"
        >
          <Box>
            <Text
              fontWeight="bold"
              fontSize={{ base: 'xl', md: '3xl' }}
              textColor={textColor}
              mt={{ base: 10, md: 20 }}
              mb={{ base: 5, md: 10 }}
            >
              リハビリ施設を探すなら
            </Text>
            <Text
              fontWeight="bold"
              fontSize={{ base: '2xl', md: '5xl' }}
              textColor={textColor}
              mb={{ base: 10, md: 20 }}
            >
              RehaBase
            </Text>
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            w={{ base: '80%', md: '70%' }}
            h={200}
            px={{ base: 4, md: 0 }}
            bg={cordBgColor}
            shadow="md"
            rounded={20}
          >
            <Text fontSize={{ base: 'lg', md: '2xl' }} mb={10}>
              さぁ、さっそくあなたの「声」を投稿してみましょう！！
            </Text>
            <Button colorScheme="orange" onClick={handleClick}>
              サービスを使ってみる
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AboutPage;
