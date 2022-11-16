import { NextPage } from 'next';
import {
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SignUpPage: NextPage = () => {
  //ダークモード対応用
  const bgColor = useColorModeValue('blackAlpha.50', 'gray.700');
  const inputBgColor = useColorModeValue('white', 'gray.600');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitSignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setIsLoading(false);
    } catch (error) {
      throw new Error('ユーザー登録でエラーが発生しました');
    } finally {
      router.push('/login');
    }
  };

  return (
    <>
      <Head>
        <title>新規登録/RehaBase</title>
      </Head>
      <Flex
        alignItems="center"
        my={20}
        w="100%"
        direction={{ sm: 'column', lg: 'row' }}
      >
        <Box maxW={600} minW={400} ml={48} mr={{ sm: 40, lg: 20 }}>
          <Image
            objectFit="contain"
            src="/login.jpg"
            alt="ログイントップ画像"
          />
        </Box>
        {isLoading && (
          <Flex
            mt={20}
            mr={20}
            w={500}
            h={200}
            direction="column"
            justify="center"
            align="center"
            bg="blue.100"
            rounded={5}
          >
            <Flex direction="column" align="center" fontSize="lg" mb={5}>
              <Text>ご登録いただいたメールアドレスに</Text>
              <Text>ユーザー登録確認メール送信を送信しています。</Text>
            </Flex>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        )}
        {!isLoading && (
          <Container bg={bgColor} borderRadius="10" mr={16} maxW={600}>
            <Text fontSize="lg" fontWeight="bold" mt={5}>
              新規ユーザー登録
            </Text>
            <Flex direction="column" py={5}>
              <FormLabel>Email</FormLabel>
              <form onSubmit={handleSubmitSignUp}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={inputBgColor}
                  placeholder="example@gmail.com"
                  isRequired
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={inputBgColor}
                  placeholder="********"
                  isRequired
                />
                <Flex mt="5" justify="space-between">
                  <Button onClick={() => router.push('/login')}>戻る</Button>
                  <Button type="submit" colorScheme="blue">
                    登録
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Container>
        )}
      </Flex>
    </>
  );
};

export default SignUpPage;
