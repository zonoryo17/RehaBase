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
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Facility } from '../../../types/facility';

type Props = {
  facility: Facility;
};

const UpdateFacilityModal = ({ facility: originalFacility }: Props) => {
  const [facility, setFacility] = useState(originalFacility);
  const {
    name,
    explanation,
    menu,
    menu2,
    menu4,
    menu5,
    price,
    price2,
    price3,
    menu3,
    price4,
    price5,
    address,
    phone_number,
  } = facility;

  const router = useRouter();
  const query = router.query;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setFacility({ ...facility, [e.target.name]: e.target.value });
  };

  // Facility情報のupdate処理
  const updateFacility = async () => {
    try {
      const { error } = await supabase
        .from('Facilities')
        .update([
          {
            ...facility,
          },
        ])
        .eq('id', query.facilityId)
        .single();
      if (error) throw error;
      //update完了のポップアップ
      toast({
        title: '施設情報を更新しました。',
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
      <Button colorScheme="blue" onClick={onOpen}>
        施設情報を更新
      </Button>
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

export default UpdateFacilityModal;
