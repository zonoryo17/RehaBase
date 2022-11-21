import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { GrAnnounce } from 'react-icons/gr';

const Footer = () => {
  return (
    <Flex p="5" width="100%" height="170px">
      <Link href="/">
        <a>
          <Image
            src="https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/apps/RehaBase.png?t=2022-11-19T14%3A36%3A32.712Z"
            alt="サービスロゴ"
            width={200}
          />
        </a>
      </Link>
      <Text m="auto">&copy;2022 RehaBase All right reserved.</Text>
      <Box fontSize="xs" _hover={{ opacity: 0.7, transition: '0.4s' }}>
        <a
          href="https://forms.gle/niDLeaNzkRnMJNx88"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Flex align="center" gap={1} mt={9}>
            <GrAnnounce size="1rem" />
            フィードバックを送信
          </Flex>
        </a>
      </Box>
    </Flex>
  );
};

export default Footer;
