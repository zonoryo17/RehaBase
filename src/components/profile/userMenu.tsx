import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  HiUser,
  HiChevronDown,
  HiOutlineLogout,
  HiOutlineLogin,
} from 'react-icons/hi';
import { UserDataContext } from '../../../pages/_app';
import HeaderUserIcon from './headerUserIcon';

const UserMenu = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  const userData = useContext(UserDataContext);
  const user = supabase.auth.user();

  useEffect(() => {
    if (user) setIsLogin(true);
  }, [isLogin]);

  const { user_name, avatar_url } = userData;

  if (!userData) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setIsLogin(false);
      if (error) {
        throw error;
      }
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
        <MenuButton
          mr={2}
          as={Button}
          colorScheme="gray"
          rightIcon={<HiChevronDown />}
        >
          <Text fontSize={{ sm: 'xs', md: 'md' }}>
            {isLogin ? user_name : 'ゲストユーザー'}
          </Text>
        </MenuButton>
        {isLogin && (
          <HeaderUserIcon src={avatar_url ? avatar_url : '/noNameUser.jpg'} />
        )}
        {!isLogin && <HeaderUserIcon src="/noNameUser.jpg" />}
      </Flex>
      <MenuList>
        {isLogin && (
          <MenuGroup title="Profile">
            <MenuItem onClick={handleClickMyPage}>
              <HiUser size="1.5rem" color="gray" />
              マイページ
            </MenuItem>
          </MenuGroup>
        )}
        <MenuDivider />
        <MenuGroup title="other">
          {isLogin && (
            <MenuItem onClick={handleLogout}>
              <HiOutlineLogout size="1.5rem" color="gray" />
              ログアウト
            </MenuItem>
          )}
          {!isLogin && (
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
