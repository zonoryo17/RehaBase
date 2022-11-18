export type Review = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  total_rating: number;
  reception_rating?: number;
  service_rating?: number;
  expense_rating?: number;
  equipment_rating?: number;
  environment_rating?: number;
  image_url?: File | File[];
  review_id?: string | string[];
  facility_id?: string;
  user_id?: string;
  auth_id?: string;
  Users?: {
    id: string;
    auth_id: string;
    facility_id: string | string[];
    user_name: string;
    gender: string;
    prefecture: string;
    age: number;
    avatar_url: string;
  };
};
