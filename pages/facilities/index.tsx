import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Link, Text } from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { Facility } from '../../types/facility';

const FacilitiesListPage: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[] | null>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: facilities, error } = await supabase
        .from<Facility>('Facilities')
        .select('*');
      setFacilities(facilities);
      console.log(facilities);
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
          {facilities &&
            facilities.map((data: Facility) => (
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
