import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';

type Facility = {
  id: string;
  name: string;
  menu: string;
  price: number;
  address?: string;
  phone_number?: string;
  created_at: Date;
};

const FacilitiesListPage: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: Facilities, error } = await supabase
        .from('Facilities')
        .select('*');
      setFacilities(Facilities);
      console.log(Facilities);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clickCreateFacility = () => {
    router.push('/facilities/create');
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        施設情報一覧
      </Text>
      <Button onClick={clickCreateFacility}>施設情報を登録</Button>
      <Box>
        <ul>
          {facilities.map((data: any) => (
            <Link href={`/facilities/${data.id}`} key={data.id}>
              <li>
                <p>{data.name}</p>
                <p>{data.address}</p>
              </li>
            </Link>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default FacilitiesListPage;
