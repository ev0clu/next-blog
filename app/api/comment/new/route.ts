import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment is required')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation with safeParse
    const validation = commentSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    const createComment = await prisma.comment.create({
      data: {
        content: body.comment,
        author: {
          connect: {
            id: user?.id
          }
        },
        post: {
          connect: {
            id: body.postId
          }
        }
      }
    });

    return NextResponse.json(
      {
        comment: {
          content: body.comment
        },
        message: 'Comment is created'
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
