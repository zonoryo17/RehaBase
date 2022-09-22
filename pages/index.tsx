import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  transition,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../src/utils/supabaseClient'

const Home: NextPage = () => {
  const [session, setSession]: any = useState(null)
  const [search, setSearch]: any = useState('')

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleClickSearch = () => {
    alert('検索ボタンが押されました')
  }

  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {session ? (
        <Box position="relative">
          <Image src="/topImage.jpg" alt="トップイメージ" width="100%" />
          <Box
            p="10"
            position="absolute"
            top="60%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <Text
              fontSize="5xl"
              textAlign="center"
              textColor="white"
              textShadow="3px 3px 4px #171717"
              mb="32"
            >
              あなたの声でつくる
              <br />
              リハビリ情報共有サイト
              <br />
              サービスタイトル○○○○
            </Text>
            <Flex>
              <Input
                size="lg"
                width="80vh"
                textColor="white"
                type="text"
                placeholder="リハビリ施設を入力"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleClickSearch}
                size="lg"
                width="100px"
                ml="2"
                boxShadow="md"
                _hover={{
                  boxShadow: 'none',
                  transition: '0.4s',
                  bg: 'gray.300',
                }}
              >
                検索
              </Button>
            </Flex>
          </Box>
        </Box>
      ) : (
        <div>ログイン失敗</div>
      )}
    </div>
  )
}

export default Home
