import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineMenu } from 'react-icons/hi';
import React from 'react';

const NavMenuDrawer = () => {
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
              <Link href="/about" _hover={{ decoration: 'none' }}>
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
              <Link href="/article" _hover={{ decoration: 'none' }}>
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
                  記事
                </Flex>
              </Link>
              <Link href="/facilities" _hover={{ decoration: 'none' }}>
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
              <Link href="/login" _hover={{ decoration: 'none' }}>
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
