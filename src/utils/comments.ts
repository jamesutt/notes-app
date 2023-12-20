import {axios} from './axios';

export type Comment = {
  id: number;
  userId: number;
  noteId: number;
  body: string;
};

export const fetchComments = async (noteId: number) => {
  const res = await axios.get('/comments', {
    params: {
      noteId,
    },
  });
  const comments = res.data as Comment[];

  return comments.sort((a, b) => b.id - a.id);
};

export const addComment = async (comment: Pick<Comment, 'noteId' | 'body'>) => {
  const res = await axios.post('/comments', comment);
  return res.data as Comment;
};

export const deleteComment = async (commentId: number) => {
  return await axios.delete(`/comments/${commentId}`);
};
