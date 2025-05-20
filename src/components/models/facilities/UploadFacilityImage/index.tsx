import {
  Box,
  Flex,
  Image,
  Spinner,
  Text,
  useToast,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

//施設トップ画像の登録，更新用コンポーネント
const UploadFacilityImage: React.FC = () => {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const query = useRouter().query;
  const facilityId = query.facilityId;
  const toast = useToast();

  // Facilitiesテーブルから施設画像のを取得
  const getFacilityImages = useCallback(async () => {
    const { data, error } = await supabase
      .from('Facilities')
      .select('image_url')
      .eq('id', facilityId)
      .single();
    if (data) {
      setImageFileUrl(data.image_url);
    }
    if (error) {
      throw error;
    }
  }, [facilityId]);

  useEffect(() => {
    getFacilityImages(); //初回レンダリング時に施設画像を取得
  }, [getFacilityImages]);

  // ファイル選択後の処理
  const uploadFacilityImage = async (
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
        .from('facilities')
        .upload(`facilityImage/${fileName}`, file);
      if (uploadError) {
        throw uploadError;
      }
      const {
        data: { publicUrl },
      } = supabase.storage //storageからuploadした画像のURLを取得
        .from('facilities')
        .getPublicUrl(`facilityImage/${fileName}`);
      if (publicUrl) setImageFileUrl(publicUrl);
      handleCreateFacilityImage(publicUrl);
    } catch (error) {
      throw new Error('画像のアップロードに失敗しました。');
    } finally {
      setUploading(false);
    }
  };

  //facilitiesテーブルに画像URLを保存
  const handleCreateFacilityImage = async (fileUrl: string) => {
    try {
      const { data, error } = await supabase
        .from('Facilities')
        .update({ image_url: fileUrl })
        .eq('id', facilityId)
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
      getFacilityImages();
    } catch (error: unknown) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Flex aria-live="polite" direction="column" align="center">
      <Box>
        <Image
          src={imageFileUrl ? imageFileUrl : '/no_image.jpg'}
          alt={imageFileUrl ? 'プロフィール画像' : '画像なし'}
          w={300}
          maxH={200}
          rounded={5}
          objectFit="contain"
        />
      </Box>
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
        <>
          <VisuallyHiddenInput // ★ ファイル選択ダイアログ
            id="facilityImage"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={uploadFacilityImage}
            disabled={uploading}
          />
          <label htmlFor="facilityImage">
            <Flex
              justify="center"
              alignItems="center"
              textAlign="center"
              fontSize="sm"
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
              施設画像
              <br />
              アップロード
            </Flex>
          </label>
        </>
      )}
    </Flex>
  );
};

export default UploadFacilityImage;
