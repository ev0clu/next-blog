import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { z } from 'zod';

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment is required')
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validation with safeParse
    const validation = commentSchema.safeParse(body);
    if (!validation.success) {
      NextResponse.json(validation.error.format(), { status: 400 });
    }
    const updateComment = await prisma.comment.update({
      where: { id: params.id },
      data: {
        content: body.comment,
        modifiedAt: new Date()
      }
    });

    return NextResponse.json(
      {
        comment: updateComment,
        message: `Comment id:${params.id} is updated`
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
