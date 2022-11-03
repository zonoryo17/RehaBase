import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

//施設トップ画像の登録，更新用コンポーネント
const UploadFacilityImage = () => {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const query = useRouter().query;
  const facilityId = query.facilityId;
  const toast = useToast();

  // Facilitiesテーブルから施設画像のを取得
  const getFacilityImages = async () => {
    const { data, error } = await supabase
      .from('Facilities')
      .select('image_url')
      .eq('id', facilityId)
      .single();
    if (data) {
      setImageFileUrl(data.image_url);
      console.log('getFacilityImages', data);
    }
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFacilityImages(); //初回レンダリング時に施設画像を取得
  }, []);

  // ファイル選択後の処理
  const uploadFacilityImage = async (e: any) => {
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
      const data = supabase.storage //storageからuploadした画像のURLを取得
        .from('facilities')
        .getPublicUrl(`facilityImage/${fileName}`);
      if (data) setImageFileUrl(data.publicURL);
      handleCreateFacilityImage(data.publicURL ?? '');
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  //facilitiesテーブルに画像URLを保存
  const handleCreateFacilityImage = async (fileUrl: string) => {
    console.log('fileUrl:', fileUrl);

    try {
      const { data, error } = await supabase
        .from('Facilities')
        .update({ image_url: fileUrl })
        .eq('id', facilityId);
      console.log('uploadTable:', data);
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
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Flex aria-live="polite" direction="column" align="center">
      <Image
        src={imageFileUrl ? imageFileUrl : '/no_image.jpg'}
        alt={imageFileUrl ? 'プロフィール画像' : '画像なし'}
        w={300}
        maxH={200}
        objectFit="contain"
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
            onChange={uploadFacilityImage}
            disabled={uploading}
          />
          <Button colorScheme="teal" fontSize="sm">
            施設画像を
            <br />
            アップロード
          </Button>
        </>
      )}
    </Flex>
  );
};

export default UploadFacilityImage;
