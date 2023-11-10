'use client';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { PostProps } from '@/types/post';
import Markdown from 'react-markdown';
import { IoIosAddCircle } from 'react-icons/io';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

const Post = ({
  params
}: {
  params: { id: string; title: string };
}) => {
  const { theme } = useContext(ThemeContext);
  const [post, setPost] = useState<PostProps>();
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const { id, title } = params;

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
      } catch (error) {
        setError('An unexpected error is occured');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {post ? (
        <div
          className={`${
            theme === 'light'
              ? 'border-neutral-300'
              : 'border-neutral-700'
          } flex flex-col justify-between rounded-lg border`}
          key={post.id}
        >
          <div className="gap-2S flex flex-col px-5 pt-5">
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
          </div>
          <div className="flex flex-row items-center justify-end gap-4 pr-3 pt-3">
            <div className="flex flex-row items-center gap-1 opacity-70">
              <BiMessageRounded />
              {/*post.comments*/}
            </div>
            <div className="flex flex-row items-center gap-1 opacity-70">
              <AiOutlineEye />
              {post.views}
            </div>
          </div>
        </div>
      ) : (
        <div>Post has not found</div>
      )}
    </>
  );
};

export default Post;
