import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';

export const useAboutPage = () => {
  const AboutTopImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-top').data.publicUrl;

  const FeaturesImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-feature').data.publicUrl;

  const TargetImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-target').data.publicUrl;

  const ManImage = supabase.storage.from('apps').getPublicUrl('About/man1')
    .data.publicUrl;

  const Man2_Image = supabase.storage.from('apps').getPublicUrl('About/man2')
    .data.publicUrl;

  const WomanImage = supabase.storage.from('apps').getPublicUrl('About/woman1')
    .data.publicUrl;

  const Woman2_Image = supabase.storage
    .from('apps')
    .getPublicUrl('About/woman2').data.publicUrl;

  const router = useRouter();
  const handleClick = () => {
    router.push('/');
  };
  return {
    AboutTopImage,
    FeaturesImage,
    TargetImage,
    ManImage,
    Man2_Image,
    WomanImage,
    Woman2_Image,
    handleClick,
  };
};
