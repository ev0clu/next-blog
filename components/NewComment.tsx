'use client';

import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  comment: z.string().min(1, 'Comment is required')
});

type formType = z.infer<typeof formSchema>;

interface Props {
  postId: string;
  handleNewCommentClick: () => void;
}

const Comment = ({ postId, handleNewCommentClick }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError('');
      setSubmitting(true);
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: data.comment,
          email: session?.user.email,
          postId: postId
        })
      });
      if (response.ok) {
        setError('');
        setSubmitting(false);
        handleNewCommentClick();
        reset({
          comment: ''
        });
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-3"
      >
        <textarea
          id="comment"
          autoComplete="comment"
          className="resize-none rounded px-2 py-1 text-slate-950"
          rows={3}
          placeholder="Type comment..."
          {...register('comment')}
        />
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
          Send {isSubmitting && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default Comment;
