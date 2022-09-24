import {
  Box,
  Flex,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const TopPageRanking = ({ name, icon, image, address }: any) => {
  return (
    <Box>
      <Box border="solid 1px" alignItems="center" rounded="20px" boxShadow="md" py="3" px="5">
        <Flex alignItems="center" justifyContent="center" mb="5">
          <Image src={icon} alt="ランキングのアイコン" w="50px" />
          <Text fontSize="2xl" ml="5">
            {name}
          </Text>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <Image src={image} alt="施設の画像" w="200px" h="200px" />
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>所在地：</Th>
                  <Th>{address}</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>総合評価：</Td>
                  <Td textColor="yellow.400">★★★★★</Td>
                </Tr>
                <Tr>
                  <Td>費用：</Td>
                  <Td textColor="yellow.400">★★★★★</Td>
                </Tr>
                <Tr>
                  <Td>接遇：</Td>
                  <Td textColor="yellow.400">★★★★★</Td>
                </Tr>
                <Tr>
                  <Td>設備：</Td>
                  <Td textColor="yellow.400">★★★★★</Td>
                </Tr>
                <Tr>
                  <Td>技術：</Td>
                  <Td textColor="yellow.400">★★★★★</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopPageRanking;
