import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
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
  VisuallyHidden,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useState, useContext, useCallback } from 'react';
import ReactStars from 'react-stars';
import { UserData } from '../../../pages/_app';

import { CgClose } from 'react-icons/cg';
import Avatar from './imageInputForm';

type Props = {
  facilityName: string;
  facilityId: string;
};

const CreateReviewModal = ({ facilityName, facilityId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useContext(UserData);
  const user = supabase.auth.user();
  console.log(user);
  console.log(userData);

  const initialState = {
    title: '',
    content: '',
    total_rating: 0,
    reception_rating: 0,
    service_rating: 0,
    expense_rating: 0,
    equipment_rating: 0,
    environment_rating: 0,
    image_url: null,
    facility_id: facilityId,
    auth_id: user?.id,
    user_id: userData?.id,
  };
  const [review, setReview] = useState(initialState);
  const {
    title,
    content,
    total_rating,
    reception_rating,
    service_rating,
    expense_rating,
    equipment_rating,
    environment_rating,
    image_url,
  } = review;

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const toast = useToast();
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
      onClose();
    }
  };

  //FileInputの状態管理

  // const resetHandler = useCallback(() => {
  //   setFiles(null);
  // }, []);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<any>(null);
  const [website, setWebsite] = useState<any>(null);
  const [avatar_url, setAvatarUrl] = useState<any>(null);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user(); // ★ ログインしているユーザーを取得

      const { data, error, status } = await supabase // ★ 当該ユーザーの profiles を取得
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // ★ ユーザー名、Webサイト、アバタURLを設定
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    // ★ 当該ユーザーの profiles を更新
    username,
    website,
    avatar_url,
  }: {
    username: any;
    website: any;
    avatar_url: any;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('reviews').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>口コミを投稿</Button>

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
              <Text mt={3}>総合評価</Text>
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
              <Text mt={3}>タイトル</Text>
              <Input
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="タイトルを入力"
                my={3}
              />
              <Text mt={3}>口コミ内容</Text>
              <Textarea
                name="content"
                value={content}
                onChange={handleChange}
                placeholder="口コミ本文を入力"
                my={3}
              />
              <Text borderBottom="1px solid black"></Text>
              <Text mt={3} mb={1}>
                写真を投稿
              </Text>
              <Box>
                <Box>
                  <Button
                    type="button"
                    aria-label="Close"
                    // onClick={resetHandler}
                    position="absolute"
                    bottom="14rem"
                    left="16rem"
                    bgColor="gray.300"
                    opacity="0.8"
                    zIndex={5}
                    p={0}
                  >
                    <CgClose size="1.5rem" color="#000" />
                  </Button>
                  <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(url: any) => {
                      setAvatarUrl(url);
                      updateProfile({ username, website, avatar_url: url });
                    }}
                  />
                </Box>
              </Box>
              {/* <Box>
                <Input
                  type="file"
                  name="image_url"
                  accept=".jpg, .png, .jpeg"
                  // onChange={handleFiles}
                  multiple
                  placeholder="写真を選択"
                />
                <Box ref={imageContainerRef} />
              </Box> */}
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
