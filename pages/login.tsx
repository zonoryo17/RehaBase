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
  useToast,
} from '@chakra-ui/react'
import { supabase } from '../src/utils/supabaseClient'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const toast = useToast()

  const handleClickLogin = async (e: any) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const { session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      if (error) throw error
      toast({
        title: 'ログイン処理が完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'left-accent',
      })
      router.push('/')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
      })
      toast({
        title: 'Googleログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'left-accent',
      })
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.log('Googleログインでエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGithub = async () => {
    try {
      setIsLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'github',
      })
      toast({
        title: 'GitHubログインが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        variant: 'left-accent',
      })
    } catch (error: any) {
      alert(error.error_description || error.message)
      console.log('GitHubログインでエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
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
            bg="gray.50"
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
            bg="gray.100"
            borderRadius="10"
            opacity="0.8"
          >
            サービスタイトル
          </Text>
        </Flex>
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
            {isLogin ? (
              <Button onClick={handleClickLogin} disabled={isLoading}>
                ログイン
              </Button>
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
