import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleteComments = await prisma.comment.deleteMany({
      where: {
        postId: params.id
      }
    });

    const deletePost = await prisma.post.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json(
      {
        post: null,
        message: `Post id:${params.id} is deleted`
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
