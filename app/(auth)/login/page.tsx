'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ThemeContext } from '@/context/ThemeContext';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must have min 3 characters')
});

type formType = z.infer<typeof formSchema>;

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');*/

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError('');
      setSubmitting(true);
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });
      if (response?.ok) {
        router.push('/');
      }
      if (response?.error) {
        setSubmitting(false);
        setError(`${response.status}: Email or password is wrong`);
      }
    } catch (error) {
      setError('An unexpected error is occured');
      setSubmitting(false);
    }
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            autoComplete="email"
            className="rounded px-2 py-1 text-slate-950"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            autoComplete="off"
            className="rounded px-2 py-1 text-slate-950"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        <p>
          Do not have an account?{' '}
          <Link className="text-blue-500 underline" href="/register">
            Register
          </Link>
        </p>
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
          Log in{isSubmitting && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default Login;
