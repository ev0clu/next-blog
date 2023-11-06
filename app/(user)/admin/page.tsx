'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import { z } from 'zod';
import Spinner from '@/components/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  code: z
    .string()
    .min(6, 'Code is too short')
    .max(6, 'Code is too long')
    .trim()
});

type formType = z.infer<typeof formSchema>;

const Admin = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError('');
      setSubmitting(true);
      const response = await fetch('/api/auth/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: data.code
        })
      });
      if (response.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            role: 'ADMIN'
          }
        });
        router.push('/profile');
        router.refresh();
      } else {
        setSubmitting(false);
        const body = await response.json();
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

  return (
    <main className="mt-5 flex flex-1 flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center">
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
            placeholder="x.xxxx"
            {...register('code')}
          />
          <ErrorMessage>{error}</ErrorMessage>
          <ErrorMessage>{errors.code?.message}</ErrorMessage>
        </div>
        <button
          className={`${
            theme === 'light'
              ? !isSubmitting
                ? 'bg-slate-950 text-slate-100'
                : 'bg-neutral-400 text-slate-950'
              : !isSubmitting
              ? 'bg-slate-100 text-slate-950'
              : 'bg-neutral-400 text-slate-950'
          } m-auto mt-2 flex flex-row items-center gap-2 rounded p-2`}
          type="submit"
          disabled={isSubmitting}
        >
          Update{isSubmitting && <Spinner />}
        </button>
      </form>
    </main>
  );
};

export default Admin;
