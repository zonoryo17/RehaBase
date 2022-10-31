import {
  Box,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  Toast,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../../../pages/_app';
import { ImageFile } from '../../../types/imageFile';

const UploadImageFile = () => {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (imageFileUrl) downloadImage(imageFileUrl); // 画像URLが変わったら実行
  }, [imageFileUrl]);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage // 画像をsupabaseからダウンロード
        .from('reviews/facilityReviews')
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

  const uploadAvatar = async (e: any) => {
    // ★ ファイル選択後の処理
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('reviews')
        .upload(`facilityReviews/${filePath}`, file);
      if (uploadError) {
        throw uploadError;
      }
      setImageFileName(fileName);
      setImageFileUrl(filePath);
      handleCreateFacilityImage();
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  //facilityImagesテーブルに画像情報を保存
  const userData = useContext(UserData);
  const router = useRouter();
  const query = router.query;

  const initialState = {
    name: imageFileName,
    image_url: imageFileUrl,
    facility_id: query.facilityId,
    user_id: userData.id,
  };

  const handleCreateFacilityImage = async () => {
    try {
      const { error } = await supabase
        .from('FacilityImages')
        .insert([{ ...initialState }])
        .single();
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
    <Box aria-live="polite">
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
        <Input // ★ ファイル選択ダイアログ
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      )}
    </Box>
  );
};

export default UploadImageFile;
