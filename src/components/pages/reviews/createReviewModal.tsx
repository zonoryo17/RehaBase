import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
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
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { UserDataContext } from '@pages/_app';
import { supabase } from '@utils/supabaseClient';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-stars';

type Props = {
  facilityName: string;
  facilityId: string;
};

type InitialState = {
  title: string;
  content: string;
  total_rating?: number;
  reception_rating?: number;
  service_rating?: number;
  expense_rating?: number;
  equipment_rating?: number;
  environment_rating?: number;
  facility_id?: string;
  auth_id?: string;
  user_id?: string;
};

const CreateReviewModal: React.FC<Props> = ({ facilityName, facilityId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();
  const userData = useContext(UserDataContext);

  useEffect(() => {
    if (userData) setIsLoggedIn(true);
  }, [userData]);

  const initialReviewState: InitialState = {
    title: '',
    content: '',
    total_rating: undefined,
    reception_rating: undefined,
    service_rating: undefined,
    expense_rating: undefined,
    equipment_rating: undefined,
    environment_rating: undefined,
    facility_id: facilityId,
    auth_id: userData?.id,
    user_id: userData?.id,
  };
  const [review, setReview] = useState(initialReviewState);
  const {
    title,
    content,
    total_rating,
    reception_rating,
    service_rating,
    expense_rating,
    equipment_rating,
    environment_rating,
  } = review;

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  //Reviewのcreate処理
  const handleClickCreateReview = async () => {
    try {
      const { error } = await supabase
        .from('Reviews')
        .insert([
          {
            ...review,
          },
        ])
        .single();
      if (error) throw error;
      // 作成完了のポップアップ
      toast({
        title: '口コミの投稿が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setReview(initialReviewState);
      onClose();
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <Button
          onClick={() =>
            toast({
              title:
                'ログインされていない場合、口コミ投稿はご利用いただけません',
              status: 'error',
              duration: 6000,
              position: 'top',
              isClosable: true,
            })
          }
        >
          口コミを投稿
        </Button>
      )}
      {isLoggedIn && <Button onClick={onOpen}>口コミを投稿</Button>}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>口コミ投稿画面</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(handleClickCreateReview)}>
            <ModalBody>
              <FormControl
                isRequired
                isInvalid={(errors.title || errors.content) && true}
              >
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                  {facilityName}
                </Text>
                <Text borderBottom="1px solid black" />
                <FormLabel mt={3}>総合評価</FormLabel>
                {/* 評価点数用の星コンポーネント */}
                <ReactStars
                  count={5}
                  size={30}
                  color2={'#ffd700'}
                  value={total_rating}
                  onChange={(newRating) =>
                    setReview({ ...review, total_rating: newRating })
                  }
                />
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Text flex="1" textAlign="left">
                        詳細を評価
                      </Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Flex gap={10}>
                        <Box>
                          <Text>接遇</Text>
                          {/* 評価点数用の星コンポーネント */}
                          <ReactStars
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            value={reception_rating}
                            onChange={(newRating) =>
                              setReview({
                                ...review,
                                reception_rating: newRating,
                              })
                            }
                          />
                        </Box>
                        <Box>
                          <Text>サービス内容</Text>
                          {/* 評価点数用の星コンポーネント */}
                          <ReactStars
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            value={service_rating}
                            onChange={(newRating) =>
                              setReview({
                                ...review,
                                service_rating: newRating,
                              })
                            }
                          />
                        </Box>
                        <Box>
                          <Text>費用</Text>
                          {/* 評価点数用の星コンポーネント */}
                          <ReactStars
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            value={expense_rating}
                            onChange={(newRating) =>
                              setReview({
                                ...review,
                                expense_rating: newRating,
                              })
                            }
                          />
                        </Box>
                        <Box>
                          <Text>機器類の充実</Text>
                          {/* 評価点数用の星コンポーネント */}
                          <ReactStars
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            value={equipment_rating}
                            onChange={(newRating) =>
                              setReview({
                                ...review,
                                equipment_rating: newRating,
                              })
                            }
                          />
                        </Box>
                        <Box>
                          <Text>環境</Text>
                          {/* 評価点数用の星コンポーネント */}
                          <ReactStars
                            count={5}
                            size={30}
                            color2={'#ffd700'}
                            value={environment_rating}
                            onChange={(newRating) =>
                              setReview({
                                ...review,
                                environment_rating: newRating,
                              })
                            }
                          />
                        </Box>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Text borderBottom="1px solid black" />
                <FormLabel htmlFor="title" mt={3}>
                  タイトル
                </FormLabel>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="タイトルを入力"
                  required
                  my={3}
                />
                <FormErrorMessage>
                  {errors.title && 'タイトルは必須項目です'}
                </FormErrorMessage>
                <FormLabel htmlFor="content" mt={3}>
                  口コミ内容
                </FormLabel>
                <Textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleChange}
                  placeholder="口コミ本文を入力"
                  required
                  my={3}
                />
                <FormErrorMessage>
                  {errors.content && '口コミ内容は必須項目です'}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
                mr={3}
              >
                投稿する
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

export default CreateReviewModal;
