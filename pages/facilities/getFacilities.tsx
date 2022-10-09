import { supabase } from '../../src/utils/supabaseClient';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Link } from '@chakra-ui/react';
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

const getFacilities: NextPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <p>施設情報一覧</p>
      <div>
        <ul>
          {facilities.map((data: any) => (
            <Link href={`./${data.id}`} key={data.id}>
              <li>
                <p>{data.name}</p>
                <p>{data.address}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default getFacilities;
