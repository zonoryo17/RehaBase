import { Box, Image } from '@chakra-ui/react';

type Props = {
  src: string;
};

const HeaderUserIcon = ({ src }: Props) => {
  if (src) {
    return (
      <Image src={src} w={16} h={16} rounded="full" alt="プロフィール画像" />
    );
  } else {
    return <Box w={10} h={10} bg="gray.400" rounded="full"></Box>;
  }
};

export default HeaderUserIcon;
