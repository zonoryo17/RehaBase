import { User } from '../../types/user';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@src/utils/supabaseClient';

const GetLoginUserData = () => {
  const [usersData, setUsersData] = useState<User | null>(null);

  const router = useRouter();
  const query = router.query;
  console.log(query);

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
  return <div>{usersData?.id}</div>;
};

export default GetLoginUserData;
