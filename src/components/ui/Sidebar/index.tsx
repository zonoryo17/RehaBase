import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineMenu } from 'react-icons/hi';
import type { FC } from 'react';
import Link from 'next/link';

const NavMenuDrawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bg="none" _hover={{ decoration: 'none' }} onClick={onOpen}>
        <HiOutlineMenu size="2rem" />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody px={0}>
            <Flex display="column" gap={5}>
              <Link href="/about" onClick={onClose}>
                <Flex
                  w="100%"
                  h={50}
                  align="center"
                  justify="center"
                  fontSize="xl"
                  px={5}
                  _hover={{
                    backgroundColor: 'blackAlpha.100',
                    transition: '0.5s',
                  }}
                >
                  RehaBaseとは
                </Flex>
              </Link>
              <Box>
                <Flex
                  w="100%"
                  h={50}
                  align="center"
                  justify="center"
                  fontSize="xl"
                  px={5}
                >
                  記事
                </Flex>
              </Box>
              <Link href="/facilities" onClick={onClose}>
                <Flex
                  w="100%"
                  h={50}
                  align="center"
                  justify="center"
                  fontSize="xl"
                  px={5}
                  _hover={{
                    backgroundColor: 'blackAlpha.100',
                    transition: '0.5s',
                  }}
                >
                  施設情報一覧
                </Flex>
              </Link>
              <Link href="/login" onClick={onClose}>
                <Flex
                  w="100%"
                  h={50}
                  align="center"
                  justify="center"
                  fontSize="xl"
                  px={5}
                  _hover={{
                    backgroundColor: 'blackAlpha.100',
                    transition: '0.5s',
                  }}
                >
                  無料会員登録/ログイン
                </Flex>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavMenuDrawer;
