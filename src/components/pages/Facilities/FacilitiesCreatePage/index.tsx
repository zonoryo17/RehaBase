import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { BsArrowLeftCircle } from 'react-icons/bs';
import PrefectureSelector from '@components/pages/MyPage/prefectureSelector';
import { useForm } from 'react-hook-form';
import { supabase } from '@utils/supabaseClient';
import { type UserContextType, UserDataContext } from '@pages/_app';

// 施設情報フォームデータの型定義
type FacilityFormData = {
  name: string;
  explanation: string;
  prefecture: string;
  address: string;
  phone_number: string;
  menu: string;
  price: string;
  menu2: string;
  price2: string;
  menu3: string;
  price3: string;
  menu4: string;
  price4: string;
  menu5: string;
  price5: string;
  auth_id?: string;
  user_id?: string;
};

const FacilitiesCreatePage: React.FC = () => {
  const { authUser, userData }: UserContextType = useContext(UserDataContext);
  const router = useRouter();
  const toast = useToast();

  // React Hook Formの設定
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<FacilityFormData>({
    defaultValues: {
      name: '',
      explanation: '',
      prefecture: '',
      address: '',
      phone_number: '',
      menu: '',
      price: '',
      menu2: '',
      price2: '',
      menu3: '',
      price3: '',
      menu4: '',
      price4: '',
      menu5: '',
      price5: '',
    },
  });

  // 都道府県セレクターのための監視
  const prefectureValue = watch('prefecture');

  // 都道府県の変更ハンドラー
  const handlePrefectureChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setValue('prefecture', e.target.value);
  };

  // Facility情報のcreate処理
  const createFacility = async (data: FacilityFormData) => {
    try {
      const { error } = await supabase
        .from('Facilities')
        .insert([
          {
            ...data,
            auth_id: authUser?.id,
            user_id: userData.id,
          },
        ])
        .single();

      if (error) throw error;

      // 作成完了のポップアップ
      toast({
        title: '施設情報の作成が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    } finally {
      router.push('/facilities');
    }
  };

  return (
    <>
      <Head>
        <title>施設情報登録/RehaBase</title>
      </Head>
      <Link href="/facilities">
        <Button ml="32" mt="10">
          {/*戻るボタンのアイコン */}
          <BsArrowLeftCircle />
          <Text ml="5px">施設一覧へ戻る</Text>
        </Button>
      </Link>
      <Center>
        <Flex
          w="1000px"
          h="100%"
          my="30px"
          border="solid 1px"
          boxShadow="md"
          borderRadius="20px"
          direction="column"
        >
          <Text mx="auto" my="30px" fontSize="2xl" fontWeight="bold">
            施設情報の登録
          </Text>
          <form onSubmit={handleSubmit(createFacility)}>
            <FormControl isRequired>
              <Stack spacing="5" w="100vh" mx="auto" my="20px">
                <FormLabel>施設名: </FormLabel>
                <Input
                  {...register('name', { required: true })}
                  placeholder="○○病院"
                />
                <FormLabel>施設紹介: </FormLabel>
                <Textarea
                  {...register('explanation', { required: true })}
                  placeholder="施設の紹介を入力"
                />

                <FormLabel>リハビリ内容一覧: </FormLabel>
                <Input
                  {...register('menu', { required: true })}
                  placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション，外来リハビリなど"
                />
                <Text>費用目安: </Text>
                <Input
                  {...register('price')}
                  placeholder="20分○○○○円～○○○○円"
                />
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          リハビリ内容詳細1
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>リハビリ内容: </Text>
                      <Input {...register('menu2')} placeholder="運動療法" />
                      <Text>費用: </Text>
                      <Input
                        {...register('price2')}
                        placeholder="脳血管20分○○○○円，運動器20分○○○○円"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          リハビリ内容詳細2
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>リハビリ内容: </Text>
                      <Input
                        {...register('menu3')}
                        placeholder="心臓リハビリテーション"
                      />
                      <Text>費用: </Text>
                      <Input {...register('price3')} placeholder="20分○○○○円" />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          リハビリ内容詳細3
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>リハビリ内容: </Text>
                      <Input
                        {...register('menu4')}
                        placeholder="がんリハビリテーション"
                      />
                      <Text>費用: </Text>
                      <Input {...register('price4')} placeholder="20分○○○○円" />
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          リハビリ内容詳細4
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text>リハビリ内容: </Text>
                      <Input
                        {...register('menu5')}
                        placeholder="外来リハビリテーション"
                      />
                      <Text>費用: </Text>
                      <Input
                        {...register('price5')}
                        placeholder="脳血管20分○○○○円，運動器20分○○○○円"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <FormLabel>所在地: </FormLabel>
                <Box w={170}>
                  <PrefectureSelector
                    prefecture={prefectureValue}
                    handleChange={handlePrefectureChange}
                  />
                </Box>
                <FormLabel>住所: </FormLabel>
                <Input
                  {...register('address', { required: true })}
                  placeholder="東京都新宿区○○○○"
                />
                <Text>電話番号: </Text>
                <Input
                  {...register('phone_number')}
                  placeholder="01-1234-5678"
                />
                <Flex justify="end">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    border="1px solid"
                    borderRadius="5px"
                    boxShadow="md"
                    py="3px"
                    px="8px"
                    w="100px"
                  >
                    登録
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
          </form>
        </Flex>
      </Center>
    </>
  );
};

export default FacilitiesCreatePage;
