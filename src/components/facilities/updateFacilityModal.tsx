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
  FormErrorMessage,
  FormLabel,
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
import PrefectureSelector from '@components/profile/prefectureSelector';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Facility } from '../../../types/facility';

type Props = {
  facility: Facility;
};

const UpdateFacilityModal = ({ facility: originalFacility }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [facility, setFacility] = useState(originalFacility);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const query = router.query;
  const toast = useToast();
  const user = supabase.auth.user();

  //バリデーション
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) setIsLoggedIn(true);
  }, []);

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
    prefecture,
    address,
    phone_number,
  } = facility;

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
      {isLoggedIn && (
        <Button colorScheme="blue" onClick={onOpen}>
          施設情報を更新
        </Button>
      )}
      {!isLoggedIn && (
        <Button
          colorScheme="blue"
          onClick={() =>
            toast({
              title: 'ログインされていない場合、施設情報の更新はできません',
              status: 'error',
              duration: 6000,
              position: 'top',
              isClosable: true,
            })
          }
        >
          施設情報を更新
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(updateFacility)}>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Flex w="1000px" h="100%" my="30px" direction="column">
                  <Text mx="auto" my="30px" fontSize="2xl" fontWeight="bold">
                    施設情報の更新
                  </Text>
                  <FormControl isRequired>
                    <Stack spacing="5" w="100vh" mx="auto" my="20px">
                      <FormLabel>施設名: </FormLabel>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="○○病院"
                        required
                      />
                      <FormLabel>施設紹介: </FormLabel>
                      <Textarea
                        name="explanation"
                        value={explanation}
                        onChange={handleChange}
                        placeholder="施設の紹介を入力"
                        required
                      />
                      <FormLabel>リハビリ内容一覧: </FormLabel>
                      <Input
                        type="text"
                        name="menu"
                        value={menu}
                        onChange={handleChange}
                        required
                        placeholder="運動療法，心臓リハビリテーション，がんリハビリテーション，訪問リハビリなど"
                      />
                      <Text>費用目安: </Text>
                      <Input
                        type="text"
                        name="price"
                        value={price}
                        onChange={handleChange}
                        required={false}
                        placeholder="○○○○～○○○○円"
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
                              required={false}
                              placeholder="運動療法"
                            />
                            <Text>費用: </Text>
                            <Input
                              type="text"
                              name="price2"
                              value={price2}
                              onChange={handleChange}
                              required={false}
                              placeholder="20分○○○○円"
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
                              required={false}
                              placeholder="心臓リハビリテーション"
                            />
                            <Text>費用: </Text>
                            <Input
                              type="text"
                              name="price3"
                              value={price3}
                              onChange={handleChange}
                              required={false}
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
                              required={false}
                              placeholder="がんリハビリテーション"
                            />
                            <Text>費用: </Text>
                            <Input
                              type="text"
                              name="price4"
                              value={price4}
                              onChange={handleChange}
                              required={false}
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
                              required={false}
                              placeholder="外来リハビリ"
                            />
                            <Text>費用: </Text>
                            <Input
                              type="text"
                              name="price5"
                              value={price5}
                              onChange={handleChange}
                              required={false}
                              placeholder="20分○○○○円"
                            />
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      <FormLabel>所在地: </FormLabel>
                      <Box w={170}>
                        <PrefectureSelector
                          prefecture={prefecture}
                          handleChange={handleChange}
                        />
                      </Box>
                      <FormLabel>住所: </FormLabel>
                      <Input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        required
                        placeholder="東京都新宿区○○○○"
                      />
                      <Text>電話番号: </Text>
                      <Input
                        type="text"
                        name="phone_number"
                        value={phone_number}
                        onChange={handleChange}
                        required={false}
                        placeholder="01-1234-5678"
                      />
                    </Stack>
                  </FormControl>
                </Flex>
              </Center>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
              >
                更新
              </Button>
              <Button variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateFacilityModal;
