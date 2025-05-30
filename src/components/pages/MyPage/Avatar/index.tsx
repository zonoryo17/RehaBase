import {
  Flex,
  Image,
  Spinner,
  Text,
  useToast,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { UserDataContext } from '@pages/_app';
import { supabase } from '@utils/supabaseClient';
import { useContext, useEffect, useState } from 'react';

type Avatar = {
  avatar_url: string;
};

//ユーザーアイコンの登録，更新用コンポーネント
const Avatar: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState<Avatar | null>(null);

  const { userData } = useContext(UserDataContext);

  const toast = useToast();

  // Usersテーブルからプロフィール画像のを取得
  const getAvatarUrl = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('avatar_url')
        .eq('id', userData?.id)
        .single();

      if (data) {
        setAvatar(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: '画像の取得に失敗しました。',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getAvatarUrl(); //初回レンダリング時にプロフィール画像を取得
  }, []);

  // ファイル選択後の処理
  const handleSubmitUploadAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      const { data } = supabase.storage //storageからuploadした画像のURLを取得
        .from('avatars')
        .getPublicUrl(`usersIcon/${fileName}`);
      createAvatarUrl(data.publicUrl);
    } catch (error) {
      toast({
        title: '画像のアップロードに失敗しました。',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
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
        .eq('id', userData?.id)
        .select();
      if (error) throw error;
      // 作成完了のポップアップ
      toast({
        title: '画像ファイルの投稿が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      getAvatarUrl();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: '画像のURLの保存に失敗しました。',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex aria-live="polite" direction="column" align="center">
      <Image
        src={
          avatar
            ? avatar.avatar_url
            : 'https://xfqdxmysyinpeegwdcsu.supabase.co/storage/v1/object/public/avatars/usersIcon/noNameUser.png'
        }
        alt={avatar ? 'プロフィール画像' : '画像なし'}
        w={100}
        h={100}
        rounded="full"
      />
      {uploading && (
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
      )}
      {!uploading && (
        <div>
          <label htmlFor="avatar">
            <Flex
              justify="center"
              alignItems="center"
              fontSize="sm"
              textAlign="center"
              bg="teal.400"
              mt={3}
              w={130}
              h={12}
              rounded={10}
              _hover={{
                bg: 'teal.300',
                transition: '0.2s',
                cursor: 'pointer',
              }}
            >
              プロフィール画像
              <br />
              アップロード
            </Flex>
          </label>
          <VisuallyHiddenInput // ★ ファイル選択ダイアログ
            id="avatar"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={handleSubmitUploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </Flex>
  );
};

export default Avatar;
