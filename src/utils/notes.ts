import {axios} from './axios';

type Note = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchNotes = async () => {
  const res = await axios.get('/notes');
  return res.data as Note[];
};
