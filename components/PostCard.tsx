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
import ErrorMessage from './ErrorMessage';
import { format } from 'date-fns';
import getNumberOfComments from '@/lib/getNumberOfComments';

const PostCard = () => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
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
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <p className="text-4xl font-bold">
            There is still no any post.
          </p>
          {session?.user.role === 'ADMIN' && (
            <Link href="/post/new">
              <IoIosAddCircle className="text-5xl" />
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="m-5 grid min-w-300 max-w-1050 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post: PostProps) => {
              return (
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
                    <Link
                      href={`/post/${post.id}`}
                      className="text-lg font-bold"
                    >
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
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-end gap-4 pr-3 pt-3">
                      <div className="flex flex-row items-center gap-1 opacity-70">
                        <BiMessageRounded />
                        {getNumberOfComments(post.comments)}
                      </div>
                      <div className="flex flex-row items-center gap-1 opacity-70">
                        <AiOutlineEye />
                        {post.views}
                      </div>
                    </div>
                    <Link
                      href={`/post/${post.id}`}
                      className={`${
                        theme === 'light'
                          ? 'bg-neutral-300'
                          : 'bg-neutral-700'
                      } m-1 rounded-lg text-center text-lg font-bold opacity-70 hover:opacity-100`}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
