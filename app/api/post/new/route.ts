import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const postSchema = z.object({
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

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    const createPost = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        author: {
          connect: {
            id: user?.id
          }
        }
      }
    });

    return NextResponse.json(
      {
        post: {
          title: body.title,
          description: body.description,
          content: body.content
        },
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
