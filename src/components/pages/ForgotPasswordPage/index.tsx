import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import Head from 'next/head';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: 'https://rehabase-app.com/reset-password',
      });
      if (error) {
        throw error;
      }
      setIsLoading(false);
      setIsSend(true);
    } catch (error) {
      throw new Error('正しくメールを送信できませんでした');
    }
  };

  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Head>
        <title>パスワード再設定/RehaBase</title>
      </Head>
      <Center mx={20} my={10}>
        <Image
          src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RB-forgetPW.jpg?t=2022-11-19T15%3A14%3A35.563Z"
          maxW={400}
          minW={200}
          mr={36}
          ml={10}
          rounded={20}
        />
        {!isLoading && !isSend && (
          <Box mt={30} minW={300}>
            <Text fontSize={{ lg: '2xl', xl: '3xl' }} mb={10}>
              パスワードをお忘れですか？
            </Text>
            <form onSubmit={handleSubmitEmail}>
              <FormControl isRequired>
                <FormLabel mb={2}>
                  登録されているメールアドレスを入力してください
                </FormLabel>
                <Input
                  value={email}
                  type="email"
                  onChange={handleSetEmail}
                  required={true}
                  placeholder="example@email.com"
                />
                <Flex mt={3} justify="space-between">
                  <Button onClick={() => router.push('/login')}>戻る</Button>
                  <Button type="submit" w={100} colorScheme="blue">
                    送信
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </Box>
        )}
        {isLoading && (
          <Box ml={100} mt={20}>
            <Text>送信中...</Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
        {isSend && (
          <Flex
            direction="column"
            align="center"
            bg="blue.500"
            mt={32}
            w={500}
            h={200}
            rounded={10}
          >
            <Text
              textAlign="center"
              fontSize="xl"
              fontWeight="bold"
              color="white"
              pt={12}
            >
              パスワード変更リンクを登録されている
              <br />
              メールアドレスに送信しました。
              <br />
              添付リンクからパスワードを変更してください。
            </Text>
          </Flex>
        )}
      </Center>
    </>
  );
};

export default ForgotPasswordPage;
