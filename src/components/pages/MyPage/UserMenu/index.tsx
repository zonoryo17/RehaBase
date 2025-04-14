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
import { useContext } from 'react';
import { useRouter } from 'next/router';
import HeaderUserIcon from './HeaderUserIcon';
import { type UserContextType, UserDataContext } from '@pages/_app';

const UserMenu: React.FC = () => {
  const router = useRouter();
  const toast = useToast();

  const { userData, isLoggedIn }: UserContextType = useContext(UserDataContext);
  const { avatar_url } = userData || {};

  // ゲストログイン判定
  const isGuest = userData?.id === process.env.GUEST_USER_ID;

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

  const handleClickMyPage = () => {
    router.push(`/mypage/${userData?.id}`);
  };

  return (
    <Menu>
      <Flex align="center">
        <MenuButton mr={0} px={0} as={Button} bg="none" colorScheme="none">
          {isLoggedIn && (
            <HeaderUserIcon src={avatar_url ? avatar_url : '/noNameUser.jpg'} />
          )}
          {!isLoggedIn && <HeaderUserIcon src="/noNameUser.jpg" />}
        </MenuButton>
      </Flex>
      <MenuList>
        {isLoggedIn && !isGuest && (
          <MenuGroup title="Profile">
            <MenuItem onClick={handleClickMyPage}>
              <HiUser size="1.5rem" color="gray" />
              マイページ
            </MenuItem>
          </MenuGroup>
        )}
        {!isLoggedIn && !isGuest && (
          <MenuGroup title="Profile">
            <MenuItem
              onClick={() =>
                toast({
                  title:
                    'ログインされていない場合、マイページはご利用いただけません',
                  status: 'error',
                  duration: 6000,
                  position: 'top',
                  isClosable: true,
                })
              }
            >
              <HiUser size="1.5rem" color="gray" />
              マイページ
            </MenuItem>
          </MenuGroup>
        )}
        {isGuest && (
          <MenuGroup title="Profile">
            <MenuItem
              onClick={() =>
                toast({
                  title: 'ゲストログインではマイページはご利用いただけません',
                  status: 'error',
                  duration: 6000,
                  position: 'top',
                  isClosable: true,
                })
              }
            >
              <HiUser size="1.5rem" color="gray" />
              マイページ
            </MenuItem>
          </MenuGroup>
        )}
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
