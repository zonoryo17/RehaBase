import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Link, Text } from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';

const FacilitiesListPage: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: facilities, error } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .order('created_at', { ascending: false });
      setFacilities(facilities);
      console.log(facilities);
      if (error) console.log('error', error);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClickCreateFacility = () => {
    router.push('/facilities/create');
  };

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        施設情報一覧
      </Text>
      <Button onClick={handleClickCreateFacility}>施設情報を登録</Button>
      <Box>
        <ul>
          {facilities &&
            facilities.map(({ id, name, address }: Facility) => (
              <Link href={`/facilities/${id}`} key={id}>
                <li>
                  <p>{name}</p>
                  <p>{address}</p>
                </li>
              </Link>
            ))}
        </ul>
      </Box>
    </>
  );
};

export default FacilitiesListPage;
