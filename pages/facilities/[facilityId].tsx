import {
  Box,
  Button,
  Center,
  Heading,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BasicUsage from '@src/components/updateModal';
import { supabase } from '@src/utils/supabaseClient';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FacilityDetailPage: NextPage = () => {
  const [name, setName] = useState('');
  const [menu, setMenu] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const query = router.query;
  console.log(query);

  useEffect(() => {
    fetchFacilityData();
  }, [query]);

  const fetchFacilityData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('id', query.facilityId)
        .single();
      console.log(data);
      if (data) {
        setName(data.name);
        setMenu(data.menu);
        setPrice(data.price);
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Center>
      <Box
        w="1000px"
        h="600px"
        my="30px"
        border="solid 1px"
        borderRadius="20px"
        boxShadow="md"
      >
        <Heading display="flex" mt="10px" mb="5px" px="20px">
          <Text fontSize="2xl">{name}</Text>
          <Spacer />
          <Link href={`/facilities/update/${query}`}>
            <BasicUsage
              facilityProps={{ name, menu, price, address, phoneNumber }}
            />
          </Link>
        </Heading>
        <Tabs align="end" variant="enclosed" colorScheme="green">
          <TabList>
            <Tab>概要</Tab>
            <Tab>内容</Tab>
            <Tab>費用</Tab>
            <Tab>写真</Tab>
            <Tab>地図</Tab>
          </TabList>
          <TabPanels textAlign="start">
            <TabPanel>
              <p>病院名：{name}</p>
            </TabPanel>
            <TabPanel>
              <p>リハビリ内容：{menu}</p>
            </TabPanel>
            <TabPanel>
              <p>費用：{price}</p>
            </TabPanel>
            <TabPanel>
              <p>写真</p>
            </TabPanel>
            <TabPanel>
              <p>住所：{address}</p>
              <p>電話番号：{phoneNumber}</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

export default FacilityDetailPage;
