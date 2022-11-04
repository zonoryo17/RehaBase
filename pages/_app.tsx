import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Layout from '@components/layout';
import 'swiper/css/bundle';
import { useEffect, useState, createContext } from 'react';
import { User } from '../types/user';
import { supabase } from '@utils/supabaseClient';

export const UserDataContext = createContext<User>({});

export default function App({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    fetchLoginUsersData();
  }, []);

  const user = supabase.auth.user();

  const fetchLoginUsersData = async () => {
    try {
      const { data } = await supabase
        .from<User>('Users')
        .select('*')
        .eq('auth_id', user?.id)
        .single();
      setUserData(data);
    } catch (error: any) {
      throw new Error(error);
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
}
