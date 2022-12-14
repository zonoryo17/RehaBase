export type User = {
  id?: string;
  auth_id?: string;
  user_name?: string;
  profile?: string;
  prefecture?: string;
  gender?: '男性' | '女性' | '選択しない';
  age?: number;
  avatar_url?: string;
};
