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
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage: FC = () => {
  //ダークモード対応用
  const bgColor = useColorModeValue('blackAlpha.50', 'gray.700');
  const inputBgColor = useColorModeValue('white', 'gray.600');
  const loginImage = useColorModeValue(
    'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RB-login.jpg',
    'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RB-login-removebg-preview.png?t=2022-11-19T13%3A10%3A48.635Z'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmitLogin = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        toast({
          title: 'ログイン処理が完了しました',
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top',
          variant: 'left-accent',
        });
      }
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'メールアドレスかパスワードが間違っています',
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
        variant: 'left-accent',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({
        provider: 'google',
      });
      if (error) throw error;
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
      const { error } = await supabase.auth.signIn({
        provider: 'github',
      });
      if (error) throw error;
      toast({
        title: 'GitHubログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
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

  //バリデーション
  const { handleSubmit } = useForm();

  return (
    <>
      <Head>
        <title>ログイン/RehaBase</title>
      </Head>
      <Flex>
        <Container minW={300} maxW={700} mx="auto" position="relative">
          <Image
            src={loginImage}
            w={650}
            alt="ログイントップ画像"
            mt={10}
            mr={10}
            rounded="10"
          />
          <Flex direction="column">
            <Text
              fontSize={{ lg: 'xl', xl: '3xl' }}
              textColor="gray.700"
              textAlign="center"
              position="absolute"
              top="14"
              left="20"
            >
              あなたの声で作るリハビリ情報共有サイト
            </Text>
            <Text
              textAlign="center"
              fontSize={{ lg: '2xl', xl: '5xl' }}
              textColor="gray.700"
              textShadow="3px 3px 4px #FFF"
              position="absolute"
              top="24"
              left="64"
            >
              RehaBase
            </Text>
          </Flex>
        </Container>
        <Container bg={bgColor} borderRadius="10" h={520} mr={16} mt={10}>
          <Text fontSize="lg" fontWeight="bold" mt={5}>
            ユーザーログイン
          </Text>
          <Flex direction="column" py={5}>
            <FormControl isRequired>
              <form onSubmit={handleSubmit(handleSubmitLogin)}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={inputBgColor}
                  placeholder="example@gmail.com"
                  required
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={inputBgColor}
                  placeholder="********"
                  required
                />
                <Flex mt="5">
                  <Button type="submit" colorScheme="blue" disabled={isLoading}>
                    ログイン
                  </Button>
                  <Spacer />
                  <Flex direction="column">
                    <Link href="/signup">新規登録</Link>
                    <Link href="/resetPassword/sendEmail">
                      パスワードを忘れた
                    </Link>
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
                      h="14"
                    />
                  </Button>
                  <Button
                    onClick={signInWithGithub}
                    bg="none"
                    _hover={{ bg: 'none' }}
                  >
                    <Image
                      src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/GitHub.png?t=2022-11-20T12%3A59%3A19.959Z"
                      w={231}
                      mt={5}
                    />
                  </Button>
                </Flex>
              </form>
            </FormControl>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default LoginPage;
