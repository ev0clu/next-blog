'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Navbar from './Navbar';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-neutral-300' : 'bg-slate-800'
      } sticky top-0 z-20 flex flex-row items-center justify-between gap-2 px-5 py-2`}
    >
      <Link
        href="/"
        className="bg-gradient-to-r from-teal-500 to-indigo-400 bg-clip-text text-3xl font-extrabold text-transparent"
      >
        WebDev Blog
      </Link>
      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
