import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Toast,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UploadFacilityImage = () => {
  const [imageFileUrl, setImageFileUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  //Facilitiesテーブルから施設画像のを取得
  const getFacilityImages = async () => {
    const { data, error } = await supabase
      .from('Facilities')
      .select('image_url');
    if (data) {
      setImageFileUrl(data);
    }
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (imageFileUrl) downloadImage(imageFileUrl); // 画像URLが変わったら実行
  }, [imageFileUrl]);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage // 画像をsupabaseからダウンロード
        .from('facilities/facilityImage')
        .download(path);
      if (error) {
        throw error;
      }
      if (typeof data === 'object') {
        // 引数で指定されたオブジェクトを表すURLを含むDOMStringを生成
        const url = URL.createObjectURL(data as Blob);
        setImageFileUrl(url);
      }
    } catch (error) {
      throw error;
    }
  };

  const uploadFacilityImage = async (e: any) => {
    // ★ ファイル選択後の処理
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = e.target.files[0]; // 選択した画像ファイルの状態
      const fileExt = file.name.split('.').pop(); //選択したファイル名を取得
      const fileName = `${Math.random()}.${fileExt}`; //投稿されたファイル名が被らないようにファイル名をランダムな数字に変換
      const filePath = `${fileName}`; //変換されたファイル名を取得

      const { error: uploadError } = await supabase.storage
        .from('facilities')
        .upload(`facilityImage/${filePath}`, file);
      if (uploadError) {
        throw uploadError;
      }
      const data = supabase.storage //storageからuploadした画像のURLを取得
        .from('facilities')
        .getPublicUrl(`facilityImage/${filePath}`);
      setImageFileUrl(data?.publicURL);
      handleCreateFacilityImage();
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  //facilitiesテーブルに画像URLを保存
  const router = useRouter();
  const query = router.query;

  const handleCreateFacilityImage = async () => {
    try {
      const { error } = await supabase
        .from('Facilities')
        .update([{ image_url: imageFileUrl }])
        .eq('id', query.facilityId);
      if (error) throw error;
      // 作成完了のポップアップ
      Toast({
        title: '画像ファイルの投稿が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
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
      {uploading ? (
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
      ) : (
        <>
          <VisuallyHiddenInput // ★ ファイル選択ダイアログ
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
