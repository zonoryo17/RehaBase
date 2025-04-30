import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import { HiUser, HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi';
import { supabase } from '@utils/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserDataContext } from '@pages/_app';
import HeaderUserIcon from './HeaderUserIcon';

const UserMenu: React.FC = () => {
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const contextData = useContext(UserDataContext);
  const { isLoggedIn, userData } = contextData;

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    //ゲストログイン用アカウントをisGuestとして設定
    if (userData?.id === process.env.NEXT_PUBLIC_GUEST_USER_ID) {
      setIsGuest(true);
    }
  }, [userData]);

  const { avatar_url } = userData || {};

  if (!userData) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast({
        title: 'ログアウトが完了しました',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
        variant: 'left-accent',
      });
    } catch (error) {
      throw new Error('正しくログアウトできませんでした');
    } finally {
      router.push('/login');
    }
  };

  const handleClickUserMenu = () => {
    if (!isLoggedIn) {
      toast({
        title: 'ログインされていない場合、マイページはご利用いただけません',
        status: 'error',
        duration: 6000,
        position: 'top',
        isClosable: true,
      });
    } else if (isGuest) {
      toast({
        title: 'ゲストログインではマイページはご利用いただけません',
        status: 'error',
        duration: 6000,
        position: 'top',
        isClosable: true,
      });
    } else {
      handleClickMyPage();
    }
  };

  const handleClickMyPage = () => {
    router.push(`/mypage/${userData?.id}`);
  };

  const profileAvatar =
    isLoggedIn && avatar_url ? avatar_url : '/noNameUser.jpg';

  return (
    <Menu>
      <Flex align="center">
        <MenuButton mr={0} px={0} as={Button} bg="none" colorScheme="none">
          <HeaderUserIcon src={profileAvatar} />
        </MenuButton>
      </Flex>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem onClick={handleClickUserMenu}>
            <HiUser size="1.5rem" color="gray" />
            マイページ
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="other">
          {isLoggedIn && (
            <MenuItem onClick={handleLogout}>
              <HiOutlineLogout size="1.5rem" color="gray" />
              ログアウト
            </MenuItem>
          )}
          {!isLoggedIn && (
            <MenuItem onClick={() => router.push('/login')}>
              <HiOutlineLogin size="1.5rem" color="gray" />
              ログイン
            </MenuItem>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
