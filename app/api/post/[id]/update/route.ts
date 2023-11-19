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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validation with safeParse
    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }
    const updatePost = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        modifiedAt: new Date()
      }
    });

    return NextResponse.json(
      {
        post: updatePost,
        message: `Post id:${params.id} is updated`
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
