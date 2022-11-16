import { ChangeEvent, FormEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';

const SendEmailToResetPassword: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/resetPassword',
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
    <Flex mx={20}>
      <Image
        src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/stock-vector-the-marketer-in-front-of-the-screen-sending-email-to-customers-vector-illustration-1658793802.jpg"
        w={600}
        mx={20}
      />
      {!isLoading && !isSend && (
        <Box mt={100}>
          <Text mb={2}>登録されているメールアドレスを入力してください</Text>
          <form onSubmit={handleSubmitEmail}>
            <Input
              value={email}
              type="email"
              onChange={handleSetEmail}
              placeholder="example@email.com"
            />
            <Flex mt={3} justify="space-between">
              <Button onClick={() => router.push('/login')}>戻る</Button>
              <Button type="submit" w={100} colorScheme="blue">
                送信
              </Button>
            </Flex>
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
          bg="teal.400"
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
    </Flex>
  );
};

export default SendEmailToResetPassword;
