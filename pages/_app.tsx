import { ChakraProvider, useToast } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Layout from '@components/layouts/layout';
import 'swiper/css/bundle';
import { useEffect, useState, createContext } from 'react';
import { User } from '../types/user';
import { supabase } from '@utils/supabaseClient';

export const UserDataContext = createContext<User>({});

const App = ({ Component, pageProps }: AppProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const toast = useToast();
  const user = supabase.auth.user();

  useEffect(() => {
    if (user && !userData) createUser(); //新規登録したユーザーのみデフォルトのプロフィールを作成
    if (user) fetchLoginUsersData();
  }, [user]);

  //ログインしているユーザーの情報を取得
  const fetchLoginUsersData = async () => {
    try {
      const { data, error } = await supabase
        .from<User>('Users')
        .select('*')
        .eq('auth_id', user?.id)
        .single();
      if (error) throw error;
      setUserData(data);
    } catch (error: any) {
      throw new Error('情報が正しく取得できませんでした');
    }
  };

  //ユーザー登録後，新規ユーザー情報をUsersテーブルに保存
  const newUser = {
    user_name: 'ユーザー',
    profile: '未設定',
    gender: '選択しない',
    prefecture: '',
    age: undefined,
    avatar_url: '',
    auth_id: user?.id,
  };
  const createUser = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .insert([
          {
            ...newUser,
          },
        ])
        .single();
      if (error) throw error;
      toast({
        title: 'ユーザー登録が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <ChakraProvider>
      <UserDataContext.Provider value={userData ?? {}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserDataContext.Provider>
    </ChakraProvider>
  );
};

export default App;
