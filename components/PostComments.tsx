import { CommentProps } from '@/types/post';
import { format } from 'date-fns';

interface Props {
  comments: CommentProps[];
}

const PostComments = ({ comments }: Props) => {
  return (
    <>
      {comments.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-4xl font-bold">
            There is still no any comments.
          </p>
        </div>
      ) : (
        <div className="justify-cente flex flex-col gap-5 pt-5">
          {comments.map((comment: CommentProps) => {
            return (
              <div
                className="flex max-w-2xl flex-col"
                key={comment.id}
              >
                <div className="flex flex-row gap-2">
                  <b> {comment.author.username}</b>
                  <div className="opacity-50">
                    {format(
                      new Date(comment.createdAt),
                      'hh:mmaaa MMM do, yyyy'
                    )}
                  </div>
                </div>
                <div className="font-light">{comment.content}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PostComments;
