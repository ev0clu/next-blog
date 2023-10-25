'use client';

import { useState, useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <main className="flex flex-1 flex-col items-center">
      <form className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="rounded px-2 py-1 text-slate-950"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded px-2 py-1 text-slate-950"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            className="rounded px-2 py-1 text-slate-950"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setConfirmPassword(e.currentTarget.value)
            }
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
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
