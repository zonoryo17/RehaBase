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
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useState } from 'react';
import RatingStar from './ratingStar';

type Props = {
  facilityName: string;
};

const CreateReviewModal = ({ facilityName }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialState = {
    title: '',
    content: '',
    total_rating: '',
    reception_rating: '',
    service_rating: '',
    expense_rating: '',
    equipment_rating: '',
    environment_rating: '',
    image_url: null,
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

  const toast = useToast();

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
      onClose();
    }
  };

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
              <RatingStar />
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
                        <RatingStar />
                      </Box>
                      <Box>
                        <Text>サービス内容</Text>
                        {/* 評価点数用の星コンポーネント */}
                        <RatingStar />
                      </Box>
                      <Box>
                        <Text>費用</Text>
                        {/* 評価点数用の星コンポーネント */}
                        <RatingStar />
                      </Box>
                      <Box>
                        <Text>機器類の充実</Text>
                        {/* 評価点数用の星コンポーネント */}
                        <RatingStar />
                      </Box>
                      <Box>
                        <Text>環境</Text>
                        {/* 評価点数用の星コンポーネント */}
                        <RatingStar />
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
              <Input
                type="file"
                name="image_url"
                accept=".jpg, .png, .jpeg"
                multiple
                placeholder="写真を選択"
              ></Input>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClickCreateReview}>
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
