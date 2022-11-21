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
import { supabase } from '@utils/supabaseClient';
import { useState, useContext, useEffect } from 'react';
import ReactStars from 'react-stars';
import { UserDataContext } from '../../../pages/_app';

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

const CreateReviewModal = ({ facilityName, facilityId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toast = useToast();
  const userData = useContext(UserDataContext);
  const user = supabase.auth.user();

  useEffect(() => {
    if (user) setIsLoggedIn(true);
  }, []);

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
    auth_id: user?.id,
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
    } catch (error: any) {
      alert(error.message);
    } finally {
      setReview(initialReviewState);
      onClose();
    }
  };

  const isTotalRatingError = total_rating === undefined;
  const isTitleError = title === '';
  const isContentError = content === '';

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
          <ModalBody>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {facilityName}
              </Text>
              <Text borderBottom="1px solid black"></Text>
              <FormControl isInvalid={isTotalRatingError}>
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
                {total_rating === undefined && (
                  <FormErrorMessage mt={0} mb={3}>
                    ※総合評価を入力してください
                  </FormErrorMessage>
                )}
              </FormControl>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        詳細を評価
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
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
                            setReview({ ...review, service_rating: newRating })
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
                            setReview({ ...review, expense_rating: newRating })
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
              <Text borderBottom="1px solid black"></Text>
              <FormControl isInvalid={isTitleError}>
                <FormLabel mt={3}>タイトル</FormLabel>
                <Input
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="タイトルを入力"
                  my={3}
                />
                {isTitleError && (
                  <FormErrorMessage mt={0} mb={3}>
                    ※タイトルを入力してください
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isContentError}>
                <FormLabel mt={3}>口コミ内容</FormLabel>
                <Textarea
                  name="content"
                  value={content}
                  onChange={handleChange}
                  placeholder="口コミ本文を入力"
                  my={3}
                />
                {isContentError && (
                  <FormErrorMessage mt={0} mb={3}>
                    ※口コミ内容を入力してください
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClickCreateReview} mr={3}>
              投稿する
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

export default CreateReviewModal;
