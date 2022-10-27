import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Layout from '../src/components/layout';
import 'swiper/css/bundle';
import { useEffect, useState, createContext } from 'react';
import { User } from '../types/user';
import { supabase } from '@src/utils/supabaseClient';

export const UserData = createContext<User>({});

export default function App({ Component, pageProps }: AppProps) {
  const [usersData, setUsersData] = useState<User | null>(null);

  useEffect(() => {
    fetchLoginUsersData();
  }, []);

  const user = supabase.auth.user();

  const fetchLoginUsersData = async () => {
    try {
      const { data: users } = await supabase
        .from<User>('Users')
        .select('*')
        .eq('auth_id', user?.id)
        .single();
      setUsersData(users);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return (
    <ChakraProvider>
      <UserData.Provider value={usersData ?? ''}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserData.Provider>
    </ChakraProvider>
  );
}
