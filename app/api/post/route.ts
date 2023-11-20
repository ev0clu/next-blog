import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true }
    });

    return NextResponse.json(
      {
        posts: posts,
        message: 'All Post records are returned'
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
