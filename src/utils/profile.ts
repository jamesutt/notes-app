import {axios} from './axios';

export type Profile = {
  id: number;
  nickname: string;
  name: string;
  picture: string;
  email: string;
};

export const fetchProfile = async () => {
  const res = await axios.get('/profile');
  return res.data as Profile;
};
