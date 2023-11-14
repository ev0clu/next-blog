import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: { author: true }
    });

    const comments = await prisma.comment.findMany({
      where: { postId: params.id },
      include: { author: true }
    });

    return NextResponse.json(
      {
        post: post,
        comments: comments,
        message: `Post id:${params.id} records are returned with comments`
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
