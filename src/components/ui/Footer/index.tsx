import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { FC } from 'react';
import { GrAnnounce } from 'react-icons/gr';

const Footer: FC = () => {
  return (
    <Box p={{ base: 2, md: 7 }} w="100%" h="170px">
      <Flex justify="space-between">
        <Box>
          <Link href="/">
            <Image
              src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RehaBase.png?t=2022-11-19T14%3A36%3A32.712Z"
              alt="サービスロゴ"
              width={200}
            />
          </Link>
        </Box>
        <Box fontSize="xs" _hover={{ opacity: 0.7, transition: '0.4s' }}>
          <a
            href="https://forms.gle/niDLeaNzkRnMJNx88"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Flex
              align="center"
              gap={1}
              mt={{ base: 8, md: 7 }}
              mr={{ base: 2, md: 5 }}
            >
              <GrAnnounce size="1rem" />
              フィードバックを送信
            </Flex>
          </a>
        </Box>
      </Flex>
      <Text textAlign="center">&copy;2022 RehaBase All right reserved.</Text>
    </Box>
  );
};

export default Footer;
