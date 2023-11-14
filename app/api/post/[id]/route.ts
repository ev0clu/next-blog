import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: true,
        comments: {
          include: {
            author: true
          }
        }
      }
    });

    return NextResponse.json(
      {
        post: post,
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatePostViews = await prisma.post.update({
      where: { id: params.id },
      data: {
        views: {
          increment: 1
        }
      }
    });

    return NextResponse.json(
      {
        post: updatePostViews,
        message: `Post id:${params.id} views record is updated`
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
