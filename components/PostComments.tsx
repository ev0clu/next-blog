'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { CommentProps } from '@/types/blog';
import { format } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import Spinner from './Spinner';
import EditComment from './EditComment';

interface Props {
  comments: CommentProps[];
  handleCommentRefreshClick: () => void;
}

const PostComments = ({
  comments,
  handleCommentRefreshClick
}: Props) => {
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const [deletePopup, setDeletePopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [commentId, setCommentId] = useState('');

  const handleDeletePopup = () => {
    setDeletePopup((prevValue) => !prevValue);
  };

  const handleDeleteClick = async () => {
    try {
      setError('');
      setSubmitting(true);
      const response = await fetch(
        `/api/comment/${commentId}/delete`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.ok) {
        handleCommentRefreshClick();
      } else {
        const body = await response.json();
        if (body.message) {
          setError(body.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
      handleDeletePopup();
      setSubmitting(false);
    } catch (error) {
      setError('An unexpected error is occured');
      setSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleCancelCommentUpdateClick = () => {
    setIsEdit(false);
  };

  return (
    <>
      {comments.length === 0 ? (
        <div className="my-10 flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-xl font-bold">
            There is still no any comments.
          </p>
        </div>
      ) : (
        <>
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
                    {session?.user.role === 'ADMIN' ||
                    session?.user.email === comment.author.email ? (
                      <div className="flex flex-row items-center gap-2">
                        <button
                          className="hover:opacity-70"
                          onClick={() => {
                            handleDeletePopup();
                            setCommentId(comment.id);
                          }}
                        >
                          <MdDelete />
                        </button>
                        <button
                          className="hover:opacity-70"
                          onClick={() => {
                            handleEditClick();
                            setCommentId(comment.id);
                          }}
                        >
                          <MdEdit />
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  {isEdit && commentId === comment.id ? (
                    <EditComment
                      commentId={commentId}
                      commentContent={comment.content}
                      handleCommentRefreshClick={
                        handleCommentRefreshClick
                      }
                      handleCancelCommentUpdateClick={
                        handleCancelCommentUpdateClick
                      }
                    />
                  ) : (
                    <>
                      <div className="font-light">
                        {comment.content}
                      </div>
                      {comment.createdAt !== comment.modifiedAt && (
                        <div className="text-right text-xs opacity-70">
                          Updated at{' '}
                          {format(
                            new Date(comment.modifiedAt),
                            'hh:mmaaa MMM do, yyyy'
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {deletePopup && (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-zinc-600 bg-opacity-70">
              <div className="fixed top-1/2 w-80 -translate-y-1/2 transform rounded-lg bg-white p-5 text-slate-900">
                <p>
                  {`Are you sure you want to delete this comment? You can't
              undo this.`}
                </p>
                <div className="mt-3 flex flex-row justify-center gap-10">
                  <button
                    className="rounded-full bg-slate-200 px-4 py-2 text-slate-900"
                    type="button"
                    onClick={handleDeletePopup}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex flex-row items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-slate-200"
                    type="submit"
                    onClick={handleDeleteClick}
                    disabled={isSubmitting}
                  >
                    Delete{isSubmitting && <Spinner />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostComments;
