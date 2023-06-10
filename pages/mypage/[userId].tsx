import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import Avatar from '@components/pages/profile/avatar';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { UserDataContext } from '../_app';
import { NextPage } from 'next';

const MyPage: NextPage = () => {
  const userData = useContext(UserDataContext);

  const { user_name, profile, gender, age, prefecture } = userData;

  //プロフィール更新ボタンを押した時の処理
  const router = useRouter();
  const handleUpdateBtn = () => {
    router.push('/mypage/updateProfile');
  };

  return (
    <>
      <Head>
        <title>{user_name}さんのマイページ/RehaBase</title>
      </Head>
      <Flex justify="center" mx={10} mt={16} mb={20}>
        <Flex
          direction="column"
          align="center"
          border="1px solid"
          rounded={10}
          maxW={1000}
          w="100%"
          h="100%"
          minH={600}
          shadow="md"
        >
          <Text fontSize="xl" fontWeight="bold" my={10}>
            {user_name}さんのマイページ
          </Text>
          <Flex justify="end" w="100%" mr={20} mb={10}>
            <Button onClick={handleUpdateBtn} colorScheme="blue">
              プロフィールを更新
            </Button>
          </Flex>
          <Flex w="100%" px={10}>
            <Box w="30%">
              <Avatar />
            </Box>
            <Spacer />
            <Box w="60%">
              <Flex gap={5}>
                <Text fontWeight="bold">名前</Text>
                <Text>{user_name}</Text>
              </Flex>
              <Flex my={5} gap={5}>
                <Text fontWeight="bold">性別</Text>
                <Text>{gender}</Text>
              </Flex>
              <Flex my={5} gap={5}>
                <Text fontWeight="bold">年齢</Text>
                <Text>{age}歳</Text>
              </Flex>
              <Flex my={5} gap={5}>
                <Text fontWeight="bold">居住地</Text>
                <Text>{prefecture}</Text>
              </Flex>
              <Text my={2} fontWeight="bold">
                プロフィール
              </Text>
              <Text h={200} mb={10}>
                {profile}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default MyPage;
