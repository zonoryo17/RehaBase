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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';

const BasicUsage = ({ facilityProps }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    phoneNumber: '',
  };

  const router = useRouter();
  const query = router.query;
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
    phoneNumber,
  } = facility;

  const handleChange = (e: { target: HTMLInputElement }) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };

  const updateFacility = async () => {
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
            phoneNumber,
          },
        ])
        .eq('id', query.facilityId)
        .single();
      if (error) throw error;
      alert('Facility updated successfully');
      setFacility(initialState);
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>施設情報を更新</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Flex w="1000px" h="100%" my="30px" direction="column">
                <Text mx="auto" my="30px" fontSize="2xl" fontWeight="bold">
                  施設情報の更新
                </Text>
                <Stack spacing="5" w="100vh" mx="auto" my="20px">
                  <Text>施設名: </Text>
                  <Input
                    type="text"
                    name="name"
                    value={facilityProps.name}
                    onChange={handleChange}
                    placeholder="○○病院"
                  />
                  <Text>リハビリ内容: </Text>
                  <Input
                    type="text"
                    name="menu"
                    value={facilityProps.menu}
                    onChange={handleChange}
                    placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                  />
                  <Text>費用: </Text>
                  <Input
                    type="text"
                    name="price"
                    value={facilityProps.price}
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
                          value={facilityProps.menu2}
                          onChange={handleChange}
                          placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                        />
                        <Text>費用: </Text>
                        <Input
                          type="text"
                          name="price2"
                          value={facilityProps.price2}
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
                          value={facilityProps.menu3}
                          onChange={handleChange}
                          placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                        />
                        <Text>費用: </Text>
                        <Input
                          type="text"
                          name="price3"
                          value={facilityProps.price3}
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
                          value={facilityProps.menu4}
                          onChange={handleChange}
                          placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                        />
                        <Text>費用: </Text>
                        <Input
                          type="text"
                          name="price4"
                          value={facilityProps.price4}
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
                          value={facilityProps.menu5}
                          onChange={handleChange}
                          placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション"
                        />
                        <Text>費用: </Text>
                        <Input
                          type="text"
                          name="price5"
                          value={facilityProps.price5}
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
                    value={facilityProps.address}
                    onChange={handleChange}
                    placeholder="東京都新宿区○○○○"
                  />
                  <Text>電話番号: </Text>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={facilityProps.phoneNumber}
                    onChange={handleChange}
                    placeholder="01-1234-5678"
                  />
                </Stack>
              </Flex>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateFacility}>
              更新
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicUsage;
