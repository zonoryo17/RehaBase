import { Box, Image } from '@chakra-ui/react';
import type { FC } from 'react';

type Props = {
  src: string;
};

const HeaderUserIcon: FC<Props> = ({ src }) => {
  if (src) {
    return (
      <Box w={16}>
        <Image src={src} w={16} h={16} rounded="full" alt="プロフィール画像" />
      </Box>
    );
  }
  return <Box w={10} h={10} bg="gray.400" rounded="full" />;
};

export default HeaderUserIcon;
