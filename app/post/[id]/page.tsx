'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { MdDelete, MdEdit } from 'react-icons/md';
import { PostProps } from '@/types/blog';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import NewComment from '@/components/NewComment';
import PostComments from '@/components/PostComments';
import ErrorMessage from '@/components/ErrorMessage';
import getNumberOfComments from '@/lib/getNumberOfComments';
import Loading from '@/components/Loading';
import Spinner from '@/components/Spinner';

const Post = ({
  params
}: {
  params: { id: string; title: string };
}) => {
  const { theme } = useContext(ThemeContext);
  const [post, setPost] = useState<PostProps>();
  const [isNewComment, setIsNewComment] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchDataUpdate = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/post/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          const res = await response.json();
          setError(
            `An unexpected error occurred. Error:${res.message}`
          );
        }
        setIsLoading(false);
      } catch (error) {
        setError('An unexpected error is occured');
        setIsLoading(false);
      }
    };

    fetchDataUpdate();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/post/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
        } else {
          setError('An unexpected error occurred');
        }
        setIsLoading(false);
      } catch (error) {
        setError('An unexpected error is occured');
        setIsLoading(false);
      }
    };

    if (isNewComment) {
      fetchData();
      setIsNewComment(false);
    }
  }, [isNewComment]);

  const handleCommentRefreshClick = () => {
    setIsNewComment(true);
  };

  const handleDeletePopup = () => {
    setDeletePopup((prevValue) => !prevValue);
  };

  const handleDeleteClick = async () => {
    try {
      setError('');
      setSubmitting(true);
      const response = await fetch(`/api/post/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        router.push('/');
      } else {
        const body = await response.json();
        handleDeletePopup();
        setSubmitting(false);
        if (body.message) {
          setError(body.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } catch (error) {
      setError('An unexpected error is occured');
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {post ? (
        <>
          <div
            className={`${
              deletePopup ? 'pointer-events-none' : ''
            } flex flex-col gap-2`}
          >
            <div
              className={`${
                theme === 'light'
                  ? 'border-neutral-300'
                  : 'border-neutral-700'
              } flex flex-col justify-between rounded-lg border`}
              key={post.id}
            >
              <div className="flex flex-col gap-2 px-5 pt-5">
                <div className="opacity-50">
                  {format(
                    new Date(post.createdAt),
                    'hh:mmaaa MMM do, yyyy'
                  )}{' '}
                  by {post.author.username}
                </div>
                <Link href="/post/new" className="text-lg font-bold">
                  {post.title}
                </Link>
                <Markdown
                  className={`prose prose-code:text-blue-300 ${
                    theme == 'light'
                      ? 'text-slate-900 prose-headings:text-slate-900 prose-p:text-slate-900 prose-blockquote:text-slate-900 prose-strong:text-slate-900 prose-ol:text-slate-900 prose-ul:text-slate-900 prose-li:text-slate-900'
                      : 'text-slate-100 prose-headings:text-slate-100 prose-p:text-slate-100 prose-blockquote:text-slate-100 prose-strong:text-slate-100 prose-ol:text-slate-100 prose-ul:text-slate-100 prose-li:text-slate-100'
                  }`}
                >
                  {post.description}
                </Markdown>
                <Markdown
                  className={`prose prose-a:text-sky-500 prose-code:text-blue-300 ${
                    theme == 'light'
                      ? 'text-slate-900 prose-headings:text-slate-900 prose-p:text-slate-900 prose-blockquote:text-slate-900 prose-strong:text-slate-900 prose-ol:text-slate-900 prose-ul:text-slate-900 prose-li:text-slate-900'
                      : 'text-slate-100 prose-headings:text-slate-100 prose-p:text-slate-100 prose-blockquote:text-slate-100 prose-strong:text-slate-100 prose-ol:text-slate-100 prose-ul:text-slate-100 prose-li:text-slate-100'
                  }`}
                >
                  {post.content}
                </Markdown>
              </div>
              <div
                className={`${
                  session?.user && session?.user.role === 'ADMIN'
                    ? 'justify-between'
                    : 'justify-end'
                } flex flex-row items-center gap-4 px-5 py-3`}
              >
                {session?.user && session?.user.role === 'ADMIN' && (
                  <div className="flex flex-row items-center gap-2">
                    <button
                      className="hover:opacity-70"
                      onClick={handleDeletePopup}
                    >
                      <MdDelete />
                    </button>
                    <Link
                      href={`/post/${id}/update`}
                      className="hover:opacity-70"
                    >
                      <MdEdit />
                    </Link>
                  </div>
                )}
                <div className="flex flex-row items-center gap-1">
                  <div className="flex flex-row items-center gap-1 opacity-70">
                    <BiMessageRounded />
                    {getNumberOfComments(post.comments)}
                  </div>
                  <div className="flex flex-row items-center gap-1 opacity-70">
                    <AiOutlineEye />
                    {post.views}
                  </div>
                </div>
              </div>
              {post.createdAt !== post.modifiedAt && (
                <div className="pb-2 pr-5 text-right text-xs opacity-70">
                  Updated at{' '}
                  {format(
                    new Date(post.modifiedAt),
                    'hh:mmaaa MMM do, yyyy'
                  )}
                </div>
              )}
            </div>
            {session?.user && (
              <div>
                <NewComment
                  postId={params.id}
                  handleCommentRefreshClick={
                    handleCommentRefreshClick
                  }
                />
              </div>
            )}
            <div>
              <p className="text-xl font-bold underline">Comments</p>
              <PostComments
                comments={post.comments}
                handleCommentRefreshClick={handleCommentRefreshClick}
              />
            </div>
          </div>
          {deletePopup && (
            <div className="absolute left-0 top-0 flex h-full w-screen items-center justify-center bg-zinc-600 bg-opacity-70">
              <div className="fixed top-1/2 w-80 -translate-y-1/2 transform rounded-lg bg-white p-5 text-slate-900">
                <p>
                  {`Are you sure you want to delete this post? You can't
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
      ) : (
        <div className="my-10 flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-xl font-bold">
            Post Id: {params.id} does not exist.
          </p>
        </div>
      )}
    </>
  );
};

export default Post;
