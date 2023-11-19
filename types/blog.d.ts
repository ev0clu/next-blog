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
  description: string;
  content: string;
  comments: CommentProps[];
  views: number;
  author: UserProps;
  createdAt: string;
  modifiedAt: string;
};

export type CommentProps = {
  id: string;
  title: string;
  content: string;
  author: UserProps;
  createdAt: string;
  modifiedAt: string;
  post: PostProps;
};
