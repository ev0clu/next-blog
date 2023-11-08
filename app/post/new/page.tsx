'use client';

import { useRouter } from 'next/navigation';
import {
  SimpleMDEReactProps,
  SimpleMdeReact
} from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ThemeContext } from '@/context/ThemeContext';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';
import { useSession } from 'next-auth/react';
import { AiFillCloseCircle } from 'react-icons/ai';

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(10, 'Title must have less than 10 characters')
    .trim(),
  content: z.string().min(1, 'Content is required')
});

type formType = z.infer<typeof formSchema>;

const NewPost = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const editorOptions = useMemo(() => {
    return {
      placeholder: 'Content',
      hideIcons: ['fullscreen'],
      sideBySideFullscreen: false
    } as SimpleMDEReactProps;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError('');
      setSubmitting(true);
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content
        })
      });
      if (response.ok) {
        router.push('/');
      } else {
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
    <>
      {session?.user.role === 'ADMIN' ? (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <input
                id="title"
                autoComplete="title"
                className="rounded px-2 py-1 text-slate-950"
                type="text"
                placeholder="Title"
                {...register('title')}
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>
            <SimpleMdeReact options={editorOptions} />
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
              Create{isSubmitting && <Spinner />}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div>
            <AiFillCloseCircle className="text-8xl text-red-700" />
          </div>
          <p className="text-4xl font-bold">Access denied</p>
          <p className="text-base opacity-50">
            You do not have <b>ADMIN</b> permission do view this page
          </p>
        </div>
      )}
    </>
  );
};

export default NewPost;
