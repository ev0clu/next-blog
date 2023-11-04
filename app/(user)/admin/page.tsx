'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import { z } from 'zod';

const Admin = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <main className="mt-5 flex flex-1 flex-col items-center">
      <form method="POST" action="">
        <div>
          <h1 className="mb-5 text-3xl font-extrabold">
            Do you really want to be admin?
          </h1>
          <p>You should answer to the following question.</p>
          <p className="mt-5">
            <b>How much is the π value by 4 digits?</b>
          </p>
          <input
            className="rounded px-2 py-1 text-slate-950"
            type="text"
            name="adminKey"
            placeholder="x.xxxx"
          />
        </div>
        <button
          className={`${
            theme === 'light'
              ? 'bg-slate-950 text-slate-100'
              : 'bg-slate-100 text-slate-950'
          } m-auto mt-2 w-20 rounded p-2`}
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Admin;
