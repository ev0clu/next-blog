'use client';

import { useRouter } from 'next/navigation';
/*import {
  SimpleMDEReactProps,
  SimpleMdeReact
} from 'react-simplemde-editor';*/
import dynamic from 'next/dynamic';
const SimpleMdeReact = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);
import { SimpleMDEReactProps } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useContext, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
    .max(30, 'Title must have less than 30 characters')
    .trim(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description must have less than 300 characters')
    .trim(),
  content: z.string().min(1, 'Content is required').trim()
});

type formType = z.infer<typeof formSchema>;

const NewPost = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const descriptionEditorOptions = useMemo(() => {
    return {
      placeholder: 'Description',
      hideIcons: ['fullscreen'],
      sideBySideFullscreen: false
    } as SimpleMDEReactProps;
  }, []);

  const contentEditorOptions = useMemo(() => {
    return {
      placeholder: 'Content',
      hideIcons: ['fullscreen'],
      sideBySideFullscreen: false
    } as SimpleMDEReactProps;
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
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
          description: data.description,
          content: data.content,
          email: session?.user.email
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
            id="new-page-form"
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
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMdeReact
                  className={`${
                    theme == 'light'
                      ? 'text-slate-900'
                      : 'text-slate-100'
                  } prose prose-code:text-blue-500`}
                  options={descriptionEditorOptions}
                  {...field}
                  ref={null}
                />
              )}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <SimpleMdeReact
                  className={`${
                    theme == 'light'
                      ? 'text-slate-900'
                      : 'text-slate-100'
                  } prose prose-code:text-blue-500`}
                  options={contentEditorOptions}
                  {...field}
                  ref={null}
                />
              )}
            />
            <ErrorMessage>{errors.content?.message}</ErrorMessage>
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
