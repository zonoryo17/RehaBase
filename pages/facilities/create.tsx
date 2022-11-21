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
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '../../src/utils/supabaseClient';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { Facility } from '../../types/facility';
import { UserDataContext } from '../_app';
import PrefectureSelector from '@components/profile/prefectureSelector';

const Create: NextPage = () => {
  const userData = useContext(UserDataContext);
  const user = supabase.auth.user();
  const initialState = {
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
    auth_id: user?.id,
    user_id: userData?.id,
  };
  const [facility, setFacility] = useState(initialState);
  const {
    name,
    explanation,
    prefecture,
    address,
    phone_number,
    menu,
    price,
    menu2,
    price2,
    menu3,
    price3,
    menu4,
    price4,
    menu5,
    price5,
  } = facility;

  const router = useRouter();
  const toast = useToast();

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };
  //Facility情報のcreate処理
  const createFacility = async () => {
    try {
      const { error } = await supabase
        .from<Facility>('Facilities')
        .insert([
          {
            ...facility,
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
    } catch (error: any) {
      alert(error.message);
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
          <Stack spacing="5" w="100vh" mx="auto" my="20px">
            <Text>施設名: </Text>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="○○病院"
            />
            <Text>施設紹介: </Text>
            <Textarea
              name="explanation"
              value={explanation}
              onChange={handleChange}
              placeholder="施設の紹介を入力"
            />

            <Text>リハビリ内容一覧: </Text>
            <Input
              type="text"
              name="menu"
              value={menu}
              onChange={handleChange}
              placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション，外来リハビリなど"
            />
            <Text>費用目安: </Text>
            <Input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
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
                  <Input
                    type="text"
                    name="menu2"
                    value={menu2}
                    onChange={handleChange}
                    placeholder="運動療法"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price2"
                    value={price2}
                    onChange={handleChange}
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
                    type="text"
                    name="menu3"
                    value={menu3}
                    onChange={handleChange}
                    placeholder="心臓リハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price3"
                    value={price3}
                    onChange={handleChange}
                    placeholder="20分○○○○円"
                  />
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
                    type="text"
                    name="menu4"
                    value={menu4}
                    onChange={handleChange}
                    placeholder="がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price4"
                    value={price4}
                    onChange={handleChange}
                    placeholder="20分○○○○円"
                  />
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
                    type="text"
                    name="menu5"
                    value={menu5}
                    onChange={handleChange}
                    placeholder="外来リハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price5"
                    value={price5}
                    onChange={handleChange}
                    placeholder="脳血管20分○○○○円，運動器20分○○○○円"
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Text>所在地: </Text>
            <Box w={170}>
              <PrefectureSelector
                prefecture={prefecture}
                handleChange={handleChange}
              />
            </Box>
            <Text>住所: </Text>
            <Input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              placeholder="東京都新宿区○○○○"
            />
            <Text>電話番号: </Text>
            <Input
              type="text"
              name="phone_number"
              value={phone_number}
              onChange={handleChange}
              placeholder="01-1234-5678"
            />
            <Flex justify="end">
              <Button
                border="1px solid"
                borderRadius="5px"
                boxShadow="md"
                py="3px"
                px="8px"
                w="100px"
                onClick={createFacility}
              >
                登録
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Center>
    </>
  );
};

export default Create;
