import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../../pages/_app';

//ユーザーアイコンの登録，更新用コンポーネント
const Avatar = () => {
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const userData = useContext(UserDataContext);
  const { id, avatar_url } = userData;

  // Usersテーブルからプロフィール画像のを取得
  const getAvatarUrl = async () => {
    const { error } = await supabase
      .from('Users')
      .select('avatar_url')
      .eq('id', id)
      .single();
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    getAvatarUrl(); //初回レンダリング時に施設画像を取得
  }, []);

  // ファイル選択後の処理
  const uploadAvatar = async (e: any) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = e.target.files[0]; // 選択した画像ファイルの状態
      const fileExt = file.name.split('.').pop(); //選択したファイル名を取得
      const fileName = `${Math.random()}.${fileExt}`; //投稿されたファイル名が被らないようにファイル名をランダムな数字に変換

      //storageに保存する処理
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`usersIcon/${fileName}`, file);
      if (uploadError) {
        throw uploadError;
      }
      const data = supabase.storage //storageからuploadした画像のURLを取得
        .from('avatars')
        .getPublicUrl(`usersIcon/${fileName}`);
      createAvatarUrl(data.publicURL ?? '');
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  //Usersテーブルに画像URLを保存
  const createAvatarUrl = async (avatarUrl: string) => {
    try {
      const { error } = await supabase
        .from('Users')
        .update({ avatar_url: avatarUrl })
        .eq('id', id);
      if (error) throw error;
      // 作成完了のポップアップ
      toast({
        title: '画像ファイルの投稿が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      getAvatarUrl();
    }
  };

  return (
    <Flex aria-live="polite" direction="column" align="center">
      <Image
        src={avatar_url ? avatar_url : '/noNameUser.jpg'}
        alt={avatar_url ? 'プロフィール画像' : '画像なし'}
        w={100}
        h={100}
        rounded="full"
      />
      {uploading && (
        <>
          <Flex direction="column" align="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text fontWeight="bold" fontSize="lg">
              アップロード中...
            </Text>
          </Flex>
        </>
      )}
      {!uploading && (
        <>
          <Input // ★ ファイル選択ダイアログ
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <Button colorScheme="teal" fontSize="sm">
            画像アップロード
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Avatar;
