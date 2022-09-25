import { NextPage } from 'next';
import { Button, Container, Flex, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react';
import { supabase } from '../src/utils/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUpPage: NextPage = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleClickSignUp = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoding(true);
      await supabase.auth.signUp({
        email,
        password,
      });
      alert('登録処理が完了しました');
      router.push('/login');
    } catch (error: any) {
      alert(error.error_description || error.message);
      console.log('ユーザー登録でエラーが発生しました');
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <Flex alignItems="center">
      <Container>
        <Image boxSize="600px" objectFit="contain" src="/signup.jpg" alt="Dan Abramov" />
        <Text>サービスタイトル</Text>
        <Text>サービスコピー</Text>
      </Container>
      <Container bg="gray.200" borderRadius="10">
        <Flex direction="column" py="10">
          <FormControl onSubmit={handleClickSignUp} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              placeholder="example@gmail.com"
              isRequired
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              placeholder="********"
              isRequired
            />
          </FormControl>
          <Flex mt="5">
            <Button type="submit" onClick={handleClickSignUp}>
              登録
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default SignUpPage;
