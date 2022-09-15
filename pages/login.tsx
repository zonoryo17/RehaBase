import { NextPage } from 'next'
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
} from '@chakra-ui/react'
import { supabase } from '../src/utils/supabaseClient'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const [isLoding, setIsLoding] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleClickLogin = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoding(true)
      const { session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      alert('ログイン処理が完了しました')
      router.push('/')
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.log('パスワードログインでエラーが発生しました')
    } finally {
      setIsLoding(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setIsLoding(true)
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
      })
      console.log('Googleでのログインが完了しました')
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.log('Googleログインでエラーが発生しました')
    } finally {
      setIsLoding(false)
    }
  }

  const signInWithGithub = async () => {
    try {
      setIsLoding(true)
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
      })
      console.log('GitHubでのログインが完了しました')
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.log('GitHubログインでエラーが発生しました')
    } finally {
      setIsLoding(false)
    }
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
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="white"
              placeholder="example@gmail.com"
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              placeholder="********"
            />
          </FormControl>
          <Flex mt="5">
            {isLogin ? (
              <Button onClick={handleClickLogin}>ログイン</Button>
            ) : (
              <Button onClick={signout}>ログアウト</Button>
            )}
            <Spacer />
            <Flex direction="column">
              <Link href="/signup">新規登録</Link>
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

export default LoginPage
