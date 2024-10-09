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
import { useRouter } from 'next/router';
import { type FC, type FormEvent, useState } from 'react';

const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.update({ password: password });
      if (error) {
        throw error;
      }
      setIsLoading(false);
      setIsSend(true);
    } catch (error) {
      throw new Error('正しくパスワードを更新できませんでした');
    }
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleToLogin = () => {
    router.push('/login');
  };

  const TopImage = supabase.storage
    .from('apps')
    .getPublicUrl('resetPassword.png');

  return (
    <Flex mx={20} my={10} justify="center">
      <Image src={TopImage.publicURL ?? ''} w={600} />
      {!isLoading && !isSend && (
        <Box ml={100} mt={20}>
          <Text>新しいパスワードを入力してください</Text>
          <form onSubmit={handleSubmitPassword}>
            <Input
              value={password}
              type="password"
              onChange={handleSetPassword}
              placeholder="********"
            />
            <Flex justify="end" mt={1}>
              <Button type="submit" w={100}>
                更新する
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
        <Box bg="teal.500" mt={32} pt={54} w={400} h={200} rounded={10}>
          <Text
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            color="white"
          >
            パスワードの変更が完了しました
          </Text>
          <Flex justify="center" mt={5}>
            <Button onClick={handleToLogin} colorScheme="gray">
              ログインページへ
            </Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default ResetPasswordPage;
