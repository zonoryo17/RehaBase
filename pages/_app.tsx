import { ChakraProvider, useToast } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '@components/layouts/layout';
import 'swiper/css/bundle';
import { useEffect, useState, createContext } from 'react';
import { supabase } from '@utils/supabaseClient';
import type { User } from '@type/user';
import type { User as AuthUser } from '@supabase/supabase-js';

// ユーザーデータと認証状態を含むコンテキストの型定義
export type UserContextType = {
  userData: User;
  authUser: AuthUser | null;
  isLoggedIn: boolean;
};

// デフォルト値を持つコンテキストを作成
export const UserDataContext = createContext<UserContextType>({
  userData: {},
  authUser: null,
  isLoggedIn: false,
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [userData, setUserData] = useState<User>({});
  const toast = useToast();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // ユーザー情報を取得
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthUser(data.user);
      setIsLoggedIn(!!data.user);
    };

    fetchUser();

    // Supabaseの認証状態変更イベントを購読
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user || null;
        setAuthUser(currentUser);
        setIsLoggedIn(!!currentUser);

        // ログアウト時にユーザーデータをリセット
        if (event === 'SIGNED_OUT') {
          setUserData({});
        }
      }
    );

    // クリーンアップ関数
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (authUser && !userData) createUser(); // 新規登録したユーザーのみデフォルトのプロフィールを作成
    if (authUser) fetchLoginUsersData();
  }, [authUser, userData]);

  //ログインしているユーザーの情報を取得
  const fetchLoginUsersData = async () => {
    if (!authUser) return; // authUserがnullの場合は処理を行わない

    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('auth_id', authUser.id)
        .single();
      if (error) throw error;
      setUserData(data);
    } catch (error: unknown) {
      console.error('ユーザー情報取得エラー:', error);
      toast({
        title: '情報が正しく取得できませんでした',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //ユーザー登録後，新規ユーザー情報をUsersテーブルに保存
  const createUser = async () => {
    // 関数内で新規ユーザーオブジェクトを作成
    const newUser = {
      user_name: 'ユーザー',
      profile: '未設定',
      gender: '選択しない',
      prefecture: '',
      age: undefined,
      avatar_url: '',
      auth_id: authUser?.id,
    };

    // authUserが存在することを確認
    if (!authUser?.id) {
      console.error('認証されたユーザーIDがありません');
      return;
    }

    try {
      const { error } = await supabase.from('Users').insert([
        {
          ...newUser,
        },
      ]);

      if (error) throw error;
      toast({
        title: 'ユーザー登録が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: unknown) {
      console.error('ユーザー登録エラー:', error);
      const errorMessage =
        error instanceof Error ? error.message : '不明なエラーが発生しました';
      toast({
        title: 'ユーザー情報の登録に失敗しました',
        description: errorMessage,
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // コンテキスト値を作成
  const contextValue: UserContextType = {
    userData,
    authUser,
    isLoggedIn,
  };

  return (
    <ChakraProvider>
      <UserDataContext.Provider value={contextValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserDataContext.Provider>
    </ChakraProvider>
  );
};

export default App;
