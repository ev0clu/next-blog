export type UserProps = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  posts: PostProps[];
  comments: CommentProps[];
};

export type PostProps = {
  id: string;
  title: string;
  content: string;
  comments: [];
  views: string;
  author: UserProps;
  createadAt: string;
};

export type CommentProps = {
  id: string;
  title: string;
  content: string;
  author: UserProps;
  createadAt: string;
  post: PostProps;
};