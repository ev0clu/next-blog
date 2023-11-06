'use client';

import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const PostCard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === 'light'
          ? 'border-neutral-300'
          : 'border-neutral-700'
      } rounded-lg border p-5`}
    >
      <div>Date</div>
      <h2>Title</h2>
      <p>Description</p>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center gap-1">
          <BiMessageRounded />
          43
        </div>
        <div className="flex flex-row items-center gap-1">
          <AiOutlineEye />
          21
        </div>
      </div>
    </div>
  );
};

export default PostCard;
