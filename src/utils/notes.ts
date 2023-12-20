import {axios} from './axios';

export type Note = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchNotes = async () => {
  const res = await axios.get('/notes');
  const notes = res.data as Note[];

  return notes.sort((a, b) => b.id - a.id);
};

export const addNote = async (note: Pick<Note, 'title' | 'body'>) => {
  const res = await axios.post('/notes', note);
  return res.data as Note;
};

export const deleteNote = async (noteId: number) => {
  return await axios.delete(`/notes/${noteId}`);
};
