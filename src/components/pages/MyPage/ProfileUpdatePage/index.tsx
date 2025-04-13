import {
  Box,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Avatar from '@components/pages/MyPage/Avatar';
import PrefectureSelector from '@components/pages/MyPage/prefectureSelector';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import type { User } from '@type/user';
import { UserDataContext } from '@pages/_app';

const ProfileUpdatePage: React.FC = () => {
  const toast = useToast();
  const userData = useContext(UserDataContext);
  const userId = userData?.id;

  const initialState = {
    ...userData,
  };

  const [userProfile, setUserProfile] = useState<User>(initialState);
  const { user_name, profile, age, gender, prefecture } = userProfile;

  //Inputフォームの状態管理
  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  }) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  // プロフィールのupdate処理
  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('Users')
        .update([
          {
            ...userProfile,
          },
        ])
        .eq('id', userId)
        .single();
      if (error) throw error;
      //update完了のポップアップ
      toast({
        title: 'プロフィールを更新しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.push(`/mypage/${userId}`);
    }
  };

  const router = useRouter();
  const handleCancel = () => {
    router.push(`/mypage/${userId}`);
  };

  return (
    <>
      <Head>
        <title>プロフィール更新/RehaBase</title>
      </Head>
      <Flex justify="center" mx={10} mt={16} mb={20}>
        <Flex
          direction="column"
          align="center"
          border="1px solid"
          rounded={10}
          maxW={1000}
          w="100%"
          h="100%"
          minH={600}
          shadow="md"
        >
          <Text fontSize="xl" fontWeight="bold" my={10}>
            {userData.user_name}さんのプロフィール
          </Text>
          <Flex gap={5} w="100%" px={10}>
            <Box w="30%">
              <Avatar />
            </Box>
            <Spacer />
            <Box w="60%">
              <Text>名前</Text>
              <Input
                placeholder="お名前を入力"
                value={user_name}
                name="user_name"
                onChange={handleChange}
              />
              <Text mt={5} mb={2}>
                性別
              </Text>
              <RadioGroup value={gender ?? ''} name="gender">
                <Stack direction="row">
                  <Radio
                    value="男性"
                    onChange={handleChange}
                    checked={userProfile.gender === '男性'}
                  >
                    男性
                  </Radio>
                  <Radio
                    value="女性"
                    onChange={handleChange}
                    checked={userProfile.gender === '女性'}
                  >
                    女性
                  </Radio>
                  <Radio
                    value="選択しない"
                    onChange={handleChange}
                    checked={userProfile.gender === '選択しない'}
                  >
                    選択しない
                  </Radio>
                </Stack>
              </RadioGroup>
              <Text mt={5}>年齢</Text>
              <NumberInput w="20%" minW="80px" defaultValue={age}>
                <NumberInputField
                  value={age}
                  name="age"
                  onChange={handleChange}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text mt={5}>居住地</Text>
              <PrefectureSelector
                prefecture={prefecture}
                handleChange={handleChange}
              />
              <Text mt={5}>プロフィール</Text>
              <Textarea
                placeholder="自己紹介を入力"
                value={profile}
                name="profile"
                onChange={handleChange}
                h={200}
                mb={10}
              />
            </Box>
          </Flex>
          <Flex justify="end" gap={5} w="100%" mr={20} mb={10}>
            <Button colorScheme="blue" onClick={updateProfile}>
              更新
            </Button>
            <Button onClick={handleCancel}>キャンセル</Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ProfileUpdatePage;
