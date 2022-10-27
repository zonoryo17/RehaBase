import { Box, Image, Input, VisuallyHidden } from '@chakra-ui/react';
import { supabase } from '@src/utils/supabaseClient';
import { useEffect, useState } from 'react';

export default function Avatar({
  url,
  size,
  onUpload, // ★ 親のAccountの関数
}: {
  url: any;
  size: any;
  onUpload: any;
}) {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url); // ★ 画像URLが変わったら実行
  }, [url]);

  const downloadImage = async (path: any) => {
    try {
      const { data, error } = await supabase.storage // ★画像をsupabaseからダウンロード
        .from('reviews/facilityReviews')
        .download(path);
      if (error) {
        throw error;
      }
      if (typeof data === 'object') {
        // ★引数で指定されたオブジェクトを表すURLを含むDOMStringを生成
        const url = URL.createObjectURL(data as Blob);
        setAvatarUrl(url);
      }
    } catch (error) {}
  };

  const uploadAvatar = async (event: any) => {
    // ★ ファイル選択後の処理
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('アップロードする画像を選択してください。');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage // ★ ファイルをsupabaseにアップロード
        .from('reviews')
        .upload(`facilityReviews/${filePath}`, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath); // ★ 親のAccountのほうで画像URLを更新する
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box style={{ width: size }} aria-live="polite">
      <Image
        src={avatarUrl ? avatarUrl : '/no_image.jpg'}
        alt={avatarUrl ? 'プロフィール画像' : '画像なし'}
        style={{ height: size, width: size }}
      />
      {uploading ? (
        'アップロード中...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single"></label>
          <Input // ★ ファイル選択ダイアログ
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </>
      )}
    </Box>
  );
}
