import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(10, 'Title must have less than 10 characters')
    .trim(),
  content: z.string().min(1, 'Content is required')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation with safeParse
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }

    /* const createPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content
      }
    });*/

    //const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        post: { title: body.title, content: body.content },
        message: 'Post created'
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error
      },
      { status: 500 }
    );
  }
}
