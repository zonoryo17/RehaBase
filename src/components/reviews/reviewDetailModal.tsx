//  本ページはReview対象外です。　完成次第表示させます。
// import {
//   Box,
//   Button,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { supabase } from '@src/utils/supabaseClient';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { Review } from '../../../types/reviews';

// const ReviewDetailModal = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [reviews, setReviews] = useState<Review>();

//   const router = useRouter();
//   const query = router.query;
//   console.log(query);

//   useEffect(() => {
//     fetchReviewData();
//   }, [query]);

//   const fetchReviewData = async () => {
//     try {
//       const { data: reviews, error } = await supabase
//         .from('Reviews')
//         .select('*, Users(user_name)')
//         .eq('id', query.reviewId)
//         .single();
//       setReviews(reviews);
//       console.log(reviews);
//       if (error) console.log('error', error);
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };
//   if (!reviews) return <div>Null</div>;
//   const {
//     id,
//     created_at,
//     title,
//     content,
//     total_rating,
//     reception_rating,
//     service_rating,
//     expense_rating,
//     equipment_rating,
//     environment_rating,
//   } = reviews;

//   const facility_id = reviews.facility_id;

//   return (
//     <>
//       <Button onClick={onOpen} colorScheme="teal" variant="ghost" size="sm">
//         詳細を見る
//       </Button>

//       <Modal
//         blockScrollOnMount={false}
//         isOpen={isOpen}
//         onClose={onClose}
//         size="5xl"
//       >
//         <Box
//           border="1px solid"
//           borderRadius={10}
//           px={5}
//           py={5}
//           maxW="70rem"
//           mx="auto"
//         >
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>{reviews.Users.user_name}さんの口コミ</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody mx="5">
//               <Text textColor="gray.400" mb="5">
//                 {created_at}投稿
//               </Text>
//               <Box>
//                 <Flex>
//                   <Text fontSize="xl" fontWeight="bold" mb="3">
//                     総合評価：{total_rating}点
//                     <span style={{ color: '#FFD700' }}>★★★★★</span>
//                   </Text>
//                 </Flex>
//                 <Flex flexWrap="wrap" justify="space-between">
//                   <Box>
//                     <Text>
//                       接遇： {reception_rating}点
//                       <span style={{ color: '#FFD700' }}> ★★★★★</span>
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text>
//                       サービス内容：{service_rating}点
//                       <span style={{ color: '#FFD700' }}> ★★★★★</span>
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text>
//                       費用：{expense_rating}点
//                       <span style={{ color: '#FFD700' }}> ★★★★★</span>
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text>
//                       機器類の充実：{equipment_rating}点
//                       <span style={{ color: '#FFD700' }}> ★★★★★</span>
//                     </Text>
//                   </Box>
//                   <Box>
//                     <Text>
//                       環境：{environment_rating}点
//                       <span style={{ color: '#FFD700' }}> ★★★★★</span>
//                     </Text>
//                   </Box>
//                 </Flex>
//                 <Text borderBottom="1px solid black" my="5"></Text>
//                 <Text fontSize="xl" fontWeight="bold" mb="3">
//                   口コミ内容
//                 </Text>
//                 <Text>{content}</Text>
//               </Box>
//             </ModalBody>
//             <ModalFooter>
//               <Button variant="ghost" mr={3} onClick={onClose}>
//                 閉じる
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ReviewDetailModal;
