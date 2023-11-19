import { CommentProps } from '@/types/blog';

const getNumberOfComments = (array: CommentProps[]) => {
  const length = array.length;
  return length;
};

export default getNumberOfComments;
