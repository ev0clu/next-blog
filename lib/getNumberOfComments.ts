import { CommentProps } from '@/types/post';

const getNumberOfComments = (array: CommentProps[]) => {
  const length = array.length;
  return length;
};

export default getNumberOfComments;
