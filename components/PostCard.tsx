'use client';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { PostProps } from '@/types/post';
import Markdown from 'react-markdown';

const PostCard = () => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.posts);
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
      {posts.map((post: PostProps) => {
        return (
          <div
            className={`${
              theme === 'light'
                ? 'border-neutral-300'
                : 'border-neutral-700'
            } rounded-lg border p-5`}
            key={post.id}
          >
            <div>{`${post.createadAt} by ${post.author.username}`}</div>
            <h2>{post.title}</h2>
            <Markdown
              className={`prose prose-code:text-blue-300 ${
                theme == 'light'
                  ? 'prose-headings:text-slate-900 prose-p:text-slate-900 prose-blockquote:text-slate-900 prose-strong:text-slate-900 prose-ol:text-slate-900 prose-ul:text-slate-900 prose-li:text-slate-900 text-slate-900'
                  : 'prose-headings:text-slate-100 prose-p:text-slate-100 prose-blockquote:text-slate-100 prose-strong:text-slate-100 prose-ol:text-slate-100 prose-ul:text-slate-100 prose-li:text-slate-100 text-slate-100'
              }`}
            >
              {post.content}
            </Markdown>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-1">
                <BiMessageRounded />
                {post.comments}
              </div>
              <div className="flex flex-row items-center gap-1">
                <AiOutlineEye />
                {post.views}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostCard;
