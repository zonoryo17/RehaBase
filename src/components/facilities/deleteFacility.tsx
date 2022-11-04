import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import React from 'react';

const DeleteFacilityButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const query = router.query;

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('Facilities')
        .delete()
        .eq('id', query.facilityId);
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      }
      toast({
        title: '施設情報を削除しました。',
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
      <Button colorScheme="red" onClick={onOpen} mx="10px">
        施設情報を削除
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size="lg"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              確認アラート
            </AlertDialogHeader>
            <AlertDialogBody>
              施設情報を削除します。本当に削除してよろしいですか？
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>キャンセル</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteFacilityButton;
