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
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@src/utils/supabaseClient';
import { Facility } from '../../types/facility';
import DeleteFacilityButton from '@src/components/deleteDialog';
import UpdateModal from '@src/components/updateModal';
import { BsArrowLeftCircle } from 'react-icons/bs';

const FacilityDetailPage: NextPage = () => {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const query = router.query;
  console.log(query);

  useEffect(() => {
    fetchFacility();
  }, [query]);

  //Facility情報の詳細（シングルページ）取得処理
  const fetchFacility = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from<Facility>('Facilities')
        .select('*')
        .eq('id', query.facilityId)
        .single();
      console.log(data);
      if (data) {
        setFacility(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Link href="/facilities">
        <Button ml="32" mt="10">
          {/*戻るボタンのアイコン */}
          <BsArrowLeftCircle />
          <Text ml="5px">施設一覧へ戻る</Text>
        </Button>
      </Link>
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
            <Text fontSize="2xl">{facility?.name}</Text>
            <Spacer />
            <Link href={`/facilities/update/${query}`}>
              <UpdateModal facilityProps={{ facility }} />
            </Link>
            <DeleteFacilityButton />
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
                <p>病院名：{facility?.name}</p>
                <p>病院紹介：{facility?.explanation}</p>
              </TabPanel>
              <TabPanel>
                <p>リハビリ内容：{facility?.menu}</p>
              </TabPanel>
              <TabPanel>
                <p>費用：{facility?.price}</p>
              </TabPanel>
              <TabPanel>
                <p>写真</p>
              </TabPanel>
              <TabPanel>
                <p>住所：{facility?.address}</p>
                <p>電話番号：{facility?.phone_number}</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
};

export default FacilityDetailPage;
