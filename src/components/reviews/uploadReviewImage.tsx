import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  Toast,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../../../pages/_app';
import { IoIosAddCircleOutline } from 'react-icons/io';

const UploadReviewImage = () => {
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [facilityReviewImages, setFacilityReviewImages] = useState<string[]>(
    []
  );
  const [uploading, setUploading] = useState(false);

  //FacilityImagesテーブルから画像情報の一覧を取得
  const getFacilityReviewImages = async () => {
    const { data, error } = await supabase
      .from('FacilityImages')
      .select('image_url');
    if (data) {
      setFacilityReviewImages(data);
    }
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    getFacilityReviewImages();
    if (imageFileUrl) downloadImage(imageFileUrl); // 画像URLが変わったら実行
  }, [facilityReviewImages]);

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
    // 画像ファイル選択後の処理
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = e.target.files[0]; // 選択した画像ファイルの状態
      const fileExt = file.name.split('.').pop(); //選択したファイル名を取得
      const fileName = `${Math.random()}.${fileExt}`; //投稿されたファイル名が被らないようにファイル名をランダムな数字に変換
      const filePath = `${fileName}`; //変換されたファイル名を取得

      let { error: uploadError } = await supabase.storage
        .from('reviews')
        .upload(`facilityReviews/${filePath}`, file);
      if (uploadError) {
        throw uploadError;
      }
      setImageFileName(fileName);
      const data = supabase.storage //storageからuploadした画像のURLを取得
        .from('reviews')
        .getPublicUrl(`facilityReviews/${filePath}`);
      setImageFileUrl(data?.publicURL);
      handleCreateFacilityReviewImage();
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

  const handleCreateFacilityReviewImage = async () => {
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
    <Flex aria-live="polite" align="center" flexWrap="wrap">
      {facilityReviewImages.map((facilityReviewImage: any) => (
        <HStack spacing="24px" direction={['column', 'row']}>
          <Box>
            <Image
              src={
                facilityReviewImage
                  ? facilityReviewImage.image_url
                  : '/no_image.jpg'
              }
              alt={facilityReviewImage ? 'プロフィール画像' : '画像なし'}
              w={200}
              maxH={200}
              objectFit="contain"
            />
          </Box>
        </HStack>
      ))}
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
          <Input // ★ ファイル選択ダイアログ
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <Button bg="none" _hover={{ bg: 'none' }}>
            <IoIosAddCircleOutline size="3rem" />
          </Button>
        </>
      )}
    </Flex>
  );
};

export default UploadReviewImage;
