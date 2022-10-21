export type User = {
  id?: string;
  user_name: string;
  profile?: string;
  prefecture?: string;
  gender?: string;
  age?: number;
  Reviews: {
    id?: string;
    title: string;
    content: string;
    total_rating?: number;
    reception_rating?: number;
    service_rating?: number;
    expensive_rating?: number;
    equipment_rating?: number;
    environment_rating?: number;
  };
};
