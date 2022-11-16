import { NextPage } from 'next';
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spacer,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage: NextPage = () => {
  //ダークモード対応用
  const bgColor = useColorModeValue('blackAlpha.50', 'gray.700');
  const inputBgColor = useColorModeValue('white', 'gray.600');

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      router.push('/');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);
      toast({
        title: 'ログイン処理が完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
        variant: 'left-accent',
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signIn({
        provider: 'google',
      });
      toast({
        title: 'Googleログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'left-accent',
      });
    } catch (error: any) {
      alert(error.error_description || error.message);
      console.log('Googleログインでエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signIn({
        provider: 'github',
      });
      toast({
        title: 'GitHubログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'left-accent',
      });
    } catch (error: any) {
      alert(error.error_description || error.message);
      console.log('GitHubログインでエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        email: 'r.nakazono17@gmail.com',
        password: 'zonopassword',
      });
      toast({
        title: 'ゲストログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
      if (error) throw error;
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Head>
        <title>ログイン/RehaBase</title>
      </Head>
      <Flex alignItems="center">
        <Container maxW="100%">
          <Image
            boxSize="600px"
            objectFit="contain"
            src="/login.jpg"
            alt="ログイントップ画像"
            mx="auto"
          />
          <Flex direction="column">
            <Text
              fontSize="3xl"
              textAlign="center"
              position="relative"
              top="-500"
              borderRadius="10"
              opacity="0.8"
            >
              あなたの声で作るリハビリ施設検索サイト
            </Text>
            <Text
              fontSize="5xl"
              textAlign="center"
              position="relative"
              top="-450"
              borderRadius="10"
              opacity="0.8"
            >
              サービスタイトル
            </Text>
          </Flex>
        </Container>
        <Container bg={bgColor} borderRadius="10" mr={10}>
          <Text fontSize="lg" fontWeight="bold" mt={5}>
            ユーザーログイン
          </Text>
          <Flex direction="column" py={10}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
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
            </FormControl>
            <Flex mt="5">
              <Button
                onClick={handleSubmitLogin}
                colorScheme="blue"
                disabled={isLoading}
              >
                ログイン
              </Button>
              <Spacer />
              <Flex direction="column">
                <Link href="/signup">新規登録</Link>
                <Link href="/resetPassword/sendEmail">パスワードを忘れた</Link>
              </Flex>
            </Flex>
            <Flex justify="center" mt="5">
              <Button onClick={handleGuestLogin} disabled={isLoading}>
                ゲストユーザーログイン
              </Button>
            </Flex>
            <Text
              border="1px"
              borderColor="gray.800"
              mx="auto"
              my="5"
              w="90%"
            ></Text>
            <Flex justify="space-between" direction="column" mx={10} px={0}>
              <Button
                onClick={signInWithGoogle}
                bg="none"
                _hover={{ bg: 'none' }}
              >
                <Image
                  src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/btn_google_signin_light_normal_web@2x.png?t=2022-11-12T07%3A15%3A16.040Z"
                  w={240}
                />
              </Button>
              <Button onClick={signInWithGithub}>GitHub</Button>
              {/* Facebookはlocalhostでは認証作れないようなのでドメイン取得後設定します
            ひとまずGoogleのonClickイベントを設定しています */}
              <Button onClick={signInWithGoogle}>Facebook</Button>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default LoginPage;
