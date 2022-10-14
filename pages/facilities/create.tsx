import { supabase } from '../../src/utils/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { BsArrowLeftCircle } from 'react-icons/bs';
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
import Link from 'next/link';
import { Facility } from '../../types/facility';
import { NextPage } from 'next';

const Create: NextPage = () => {
  const initialState = {
    name: '',
    explanation: '',
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
    address: '',
    phone_number: '',
  };
  const [facility, setFacility] = useState(initialState);
  const {
    name,
    explanation,
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
    address,
    phone_number,
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
      const { data, error } = await supabase
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

            <Text>リハビリ内容: </Text>
            <Input
              type="text"
              name="menu"
              value={menu}
              onChange={handleChange}
              placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
            />
            <Text>費用: </Text>
            <Input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="○○○○円"
            />
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      リハビリ内容2
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
                    placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price2"
                    value={price2}
                    onChange={handleChange}
                    placeholder="○○○○円"
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      リハビリ内容3
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
                    placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price3"
                    value={price3}
                    onChange={handleChange}
                    placeholder="○○○○円"
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      リハビリ内容4
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
                    placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price4"
                    value={price4}
                    onChange={handleChange}
                    placeholder="○○○○円"
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      リハビリ内容5
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
                    placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price5"
                    value={price5}
                    onChange={handleChange}
                    placeholder="○○○○円"
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
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
            <Button
              border="1px solid"
              borderRadius="5px"
              boxShadow="md"
              py="3px"
              px="8px"
              w="100px"
              bg="gray.100"
              _hover={{ bg: 'gray.300' }}
              onClick={createFacility}
            >
              登録
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  );
};

export default Create;
