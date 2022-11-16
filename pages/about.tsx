import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AboutPage: NextPage = () => {
  //ダークモードの背景，テキストの設定
  const bgColor = useColorModeValue('gray.700', 'gray.200');
  const cordBgColor = useColorModeValue('whiteAlpha.900', 'gray.700');
  const textColor = useColorModeValue('gray.100', 'gray.700');

  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>RehaBaseとは</title>
      </Head>
      <Flex direction="column" align="center">
        <Flex position="relative" justify="center" width="100%">
          <Image src="/login.jpg" alt="トップイメージ" />
          <Box
            p="10"
            position="absolute"
            top="60%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Text
              fontSize={{ sm: '2xl', md: '3xl', lg: '4xl', xl: '5xl' }}
              textAlign="center"
              textColor="white"
              textShadow="3px 3px 4px #171717"
              mb="32"
            >
              あなたの声でつくる
              <br />
              リハビリ情報共有サイト
              <br />
              RehaBase
            </Text>
          </Box>
        </Flex>
        <Flex display="column" my="10" textAlign="center">
          <Text fontWeight="bold" fontSize="3xl" my={5}>
            RehaBaseについて
          </Text>
          <Text fontSize="xl">
            RehaBaseはリハビリ情報を共有する口コミ型のリハビリ施設検索サービスです。
            <br />
          </Text>
          <Text fontWeight="bold" fontSize="3xl" mt={20} mb={10}>
            こんなお悩みありませんか？
          </Text>
          <Grid gap={3} maxW={600}>
            <Flex>
              <Image
                src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/man1.png"
                w={100}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={5}
                mx={5}
                textAlign="left"
              >
                「ここいいよ！」と言われて行ってみたけど、マッサージをされて終わった。
              </Text>
            </Flex>
            <Flex>
              <Image
                src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/woman1.png"
                w={100}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={5}
                mx={5}
                textAlign="left"
              >
                もうすぐ退院するけど、帰ってからどこでリハビリをしたらいいかわからない
              </Text>
            </Flex>
            <Flex>
              <Image
                src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/man2.png"
                w={100}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={9}
                mx={5}
                w="100%"
                textAlign="left"
              >
                どこでどんなリハビリが受けられるのかよくわからない
              </Text>
            </Flex>
            <Flex>
              <Image
                src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/woman2.png"
                w={100}
              />
              <Text
                border="1px solid"
                rounded={10}
                px={3}
                py={5}
                mx={5}
                textAlign="left"
              >
                実際に行こうと思ってるリハビリ施設でリハビリを受けた人の感想が聞いてみたい
              </Text>
            </Flex>
          </Grid>
        </Flex>
        <Text
          fontSize="3xl"
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
          <Text fontWeight="bold" fontSize="3xl" my={5}>
            RehaBaseの特徴
          </Text>
          <Flex align="center" gap={5}>
            <UnorderedList fontSize="xl" spacing={2}>
              <ListItem>気になるリハビリ施設を検索できる！</ListItem>
              <ListItem>リハビリ施設のリアルな評価がわかる！</ListItem>
              <ListItem>受けたリハビリの口コミを投稿できる！</ListItem>
              <ListItem>みんなでいいリハビリ施設の情報を共有できる！</ListItem>
            </UnorderedList>
            <Image src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/user-social-networking-chatting-using-600w-1049386997.webp" />
          </Flex>
        </Flex>
        <Text fontWeight="bold" fontSize="3xl" my={5}>
          RehaBaseの使用対象者
        </Text>
        <Flex justify="center" align="center" w="100%" pt={10} pb={20} gap={5}>
          <Image
            src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/isometric-rehabilitation-physiotherapy-flowchart-composition-600w-1474502750.webp"
            h={400}
          />
          <UnorderedList fontSize="xl" spacing={2}>
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
              fontSize="3xl"
              textColor={textColor}
              mt={20}
              mb={10}
            >
              リハビリ施設を探すなら
            </Text>
            <Text
              fontWeight="bold"
              fontSize="5xl"
              textColor={textColor}
              mb={20}
            >
              RehaBase
            </Text>
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            w="70%"
            h={200}
            bg={cordBgColor}
            shadow="md"
            rounded={20}
          >
            <Text fontSize="2xl" mb={10}>
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
