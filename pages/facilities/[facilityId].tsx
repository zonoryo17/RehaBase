import {
  Box,
  Center,
  Flex,
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

const FacilityPage: NextPage = () => {
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
        <Heading mt="10px" mb="5px" px="20px">
          <Text fontSize="2xl">大阪病院</Text>
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
              <p>概要</p>
            </TabPanel>
            <TabPanel>
              <p>内容</p>
            </TabPanel>
            <TabPanel>
              <p>費用</p>
            </TabPanel>
            <TabPanel>
              <p>写真</p>
            </TabPanel>
            <TabPanel>
              <p>地図</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

export default FacilityPage;
