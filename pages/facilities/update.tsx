import { supabase } from '../../src/utils/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';
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
} from '@chakra-ui/react';

const Update = () => {
  const initialState = {
    name: '',
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

  const router = useRouter();
  const [facility, setFacility] = useState(initialState);

  const {
    name,
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

  const handleChange = (e: { target: HTMLInputElement }) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };

  const createFacility = async () => {
    try {
      const { data, error } = await supabase
        .from('Facilities')
        .update([
          {
            name,
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
          },
        ])
        .eq('id', 'e139e5b8-27bd-407a-bd1d-25861d6e3821')
        .single();
      if (error) throw error;
      alert('Facility created successfully');
      setFacility(initialState);
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
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
            施設情報の更新
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
              更新
            </Button>
          </Stack>
        </Flex>
      </Center>
    </>
  );
};

export default Update;
