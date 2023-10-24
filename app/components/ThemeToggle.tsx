'use client';

import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { MdDarkMode } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, handleThemeToggle } = useContext(ThemeContext);
  return (
    <button
      className="flex h-7 flex-row items-center gap-3 rounded-full bg-slate-100 px-2"
      onClick={handleThemeToggle}
    >
      <MdDarkMode
        className={`${
          theme === 'light' ? 'text-slate-900' : 'text-orange-400'
        }`}
      />
      <BsSunFill
        className={`${
          theme === 'light' ? 'text-orange-400' : 'text-slate-900'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
