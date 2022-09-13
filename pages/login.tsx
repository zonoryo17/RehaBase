import { NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { supabase } from '../src/utils/supabaseClient'
import Link from 'next/link'

const Login: NextPage = () => {
  const handleClickLogin = () => {}

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })
  }

  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    })
  }
  const signout = async () => {
    const { error } = await supabase.auth.signOut()
  }
  return (
    <Flex alignItems="center">
      <Container>
        <Image
          boxSize="600px"
          objectFit="contain"
          src="/login.jpg"
          alt="Dan Abramov"
        />
        <Text>サービスタイトル</Text>
        <Text>サービスコピー</Text>
      </Container>
      <Container bg="gray.200" borderRadius="10">
        <Flex direction="column" py="10">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" bg="white" placeholder="example@gmail.com" />
            <FormLabel>Password</FormLabel>
            <Input type="password" bg="white" placeholder="********" />
          </FormControl>
          <Flex mt="5">
            <Button onClick={handleClickLogin}>ログイン</Button>
            {/* <Button onClick={signout}>ログアウト</Button> */}
            <Spacer />
            <Flex direction="column">
              <Link href="">新規登録</Link>
              <Link href="/">パスワードを忘れた</Link>
            </Flex>
          </Flex>
          <Flex justify="center" mt="5">
            <Button>テストユーザーログイン</Button>
          </Flex>
          <Text
            border="1px"
            borderColor="gray.800"
            mx="auto"
            my="5"
            w="90%"
          ></Text>
          <Flex justify="space-between" mx="10">
            <Button onClick={signInWithGoogle}>Google</Button>
            <Button onClick={signInWithGithub}>GitHub</Button>
            {/* Facebookはlocalhostでは認証作れないようなのでドメイン取得後設定します
            ひとまずGoogleのonClickイベントを設定しています */}
            <Button onClick={signInWithGoogle}>Facebook</Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Login
