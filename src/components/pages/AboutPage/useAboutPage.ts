import { supabase } from '@utils/supabaseClient';
import { useRouter } from 'next/router';

export const useAboutPage = () => {
  const AboutTopImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-top').publicURL;
  const FeaturesImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-feature').publicURL;
  const TargetImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/about-target').publicURL;
  const ManImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/man1').publicURL;
  const Man2_Image = supabase.storage
    .from('apps')
    .getPublicUrl('About/man2').publicURL;
  const WomanImage = supabase.storage
    .from('apps')
    .getPublicUrl('About/woman1').publicURL;
  const Woman2_Image = supabase.storage
    .from('apps')
    .getPublicUrl('About/woman2').publicURL;

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
