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
import React, { FC, useEffect, useState } from 'react';

//施設情報削除コンポーネント
const DeleteFacilityButton: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const query = router.query;
  const user = supabase.auth.user();

  useEffect(() => {
    if (user) setIsLoggedIn(true);
  }, []);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('Facilities')
        .delete()
        .eq('id', query.facilityId);
      if (error) {
        throw error;
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
      {isLoggedIn && (
        <Button colorScheme="red" onClick={onOpen} mx="10px">
          施設情報を削除
        </Button>
      )}
      {!isLoggedIn && (
        <Button
          colorScheme="red"
          mx="10px"
          onClick={() =>
            toast({
              title: 'ログインされていない場合、施設情報の削除はできません',
              status: 'error',
              duration: 6000,
              position: 'top',
              isClosable: true,
            })
          }
        >
          施設情報を削除
        </Button>
      )}
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
