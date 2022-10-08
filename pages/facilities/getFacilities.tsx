import { supabase } from '../../src/utils/supabaseClient';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';

type Facility = {
  id: string;
  title: string;
  content: string;
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
      let { data: Facilities, error } = await supabase
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
      <p>Hello, world</p>
      <div>
        <ul>
          {facilities.map((facility: any) => (
            <>
              <li key={facility.id}>
                <p>{facility.name}</p>
              </li>
              <li key={facility.id}>
                <p>{facility.price}</p>
              </li>
              <li key={facility.id}>
                <p>{facility.menu}</p>
              </li>
            </>
          ))}
        </ul>
        <p>End World</p>
      </div>
    </>
  );
};

export default getFacilities;
