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
import { type FC, useContext, useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { UserDataContext } from '../../../../pages/_app';

type Props = {
  facilityId: string | string[] | undefined;
};

//画像ファイルのアップロードコンポーネント
const UploadReviewImage: FC<Props> = ({ facilityId }) => {
  const [facilityReviewImageUrls, setFacilityReviewImageUrls] = useState<
    string[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  //FacilityImagesテーブルから画像情報の一覧を取得
  const getFacilityReviewImages = async () => {
    try {
      const { data, error } = await supabase
        .from('FacilityImages')
        .select('image_url')
        .eq('facility_id', facilityId);
      if (data) {
        setFacilityReviewImageUrls(data);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFacilityReviewImages();
  }, []);

  // 画像ファイル選択後の処理
  const handleSelectImageFile = async (e: any) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }
      const file = e.target.files[0]; // 選択した画像ファイルの状態
      const fileExt = file.name.split('.').pop(); //選択したファイル名を取得
      const fileName = `${Math.random()}.${fileExt}`; //投稿されたファイル名が被らないようにファイル名をランダムな数字に変換
      const { error: uploadError } = await supabase.storage
        .from('reviews')
        .upload(`facilityReviews/${fileName}`, file);
      if (uploadError) {
        throw uploadError;
      }
      const data = supabase.storage //storageからuploadした画像のURLを取得
        .from('reviews')
        .getPublicUrl(`facilityReviews/${fileName}`);
      handleCreateFacilityReviewImage(fileName, data.publicURL ?? '');
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  //facilityImagesテーブルに画像情報を保存
  const query = useRouter().query; //facilityのqueryIDを取得
  const userData = useContext(UserDataContext); //Usersテーブルからログインしているユーザーの情報を取得

  const handleCreateFacilityReviewImage = async (
    fileName: string,
    imageUrl: string
  ) => {
    try {
      const { error } = await supabase.from('FacilityImages').insert([
        {
          name: fileName,
          image_url: imageUrl,
          facility_id: query.facilityId,
          user_id: userData?.id,
        },
      ]);
      if (error) throw error;
      // 作成完了のポップアップ
      toast({
        title: '画像ファイルの投稿が完了しました。',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      getFacilityReviewImages();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Flex aria-live="polite" align="center">
      <Flex gap="24px" flexWrap="wrap" align="center">
        {facilityReviewImageUrls.map((facilityReviewImage: any, i) => (
          <Flex w="200px" h="200px" key={i}>
            <Image
              src={
                facilityReviewImage
                  ? facilityReviewImage.image_url
                  : '/no_image.jpg'
              }
              alt={facilityReviewImage ? 'プロフィール画像' : '画像なし'}
              objectFit="contain"
            />
          </Flex>
        ))}
        {uploading && (
          <Flex direction="column" align="center" width="300px">
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
        <Box>
          <label htmlFor="reviewImage">
            <Box _hover={{ cursor: 'pointer' }}>
              <IoIosAddCircleOutline size="3rem" />
            </Box>
          </label>
        </Box>
      </Flex>
      <VisuallyHiddenInput // ファイル選択ダイアログ
        id="reviewImage"
        type="file"
        accept=".jpeg, .jpg, .png"
        onChange={handleSelectImageFile}
        disabled={uploading}
      />
    </Flex>
  );
};

export default UploadReviewImage;
