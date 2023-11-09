import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

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
    const session = await getServerSession(authOptions);

    // Validation with safeParse
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email!
      }
    });

    const createPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    console.log(createPost);

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
