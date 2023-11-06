import { NextResponse, userAgent } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/prisma/client';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const codeSchema = z.object({
  code: z
    .string()
    .min(6, 'Code is too short')
    .max(6, 'Code is too long')
    .trim()
});

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const { code } = codeSchema.parse(body);

    if (code !== process.env.CODE) {
      return NextResponse.json(
        {
          message: 'The code is wrong'
        },
        {
          status: 409
        }
      );
    }

    const updateUserRoleById = await prisma.user.update({
      where: {
        email: session?.user.email!
      },
      data: {
        role: 'ADMIN'
      }
    });

    return NextResponse.json(
      {
        message: 'Code is accepted. Admin role is set!'
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
