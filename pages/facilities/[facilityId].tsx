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
import { supabase } from '@src/utils/supabaseClient';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FacilityDetailPage: NextPage = () => {
  const [name, setName] = useState('');
  const [menu, setMenu] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilityData();
  }, []);

  const fetchFacilityData = async () => {
    const { id }: any = await supabase.from('Facilities').select('id').single();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Facilities')
        .select('*')
        .eq('id', id)
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
          <Text fontSize="2xl">病院名：{name}</Text>
          <Spacer />
          <Link href="/facilities/update/">
            <Button>更新</Button>
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
