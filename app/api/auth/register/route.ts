import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/prisma/client';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(1, 'Username is required').max(10).trim(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must have min 3 characters')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body);

    const existUserByName = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (existUserByName) {
      return NextResponse.json(
        {
          user: null,
          message: 'Username already exist'
        },
        {
          status: 409
        }
      );
    }

    const existUserByEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: 'Email already exist'
        },
        {
          status: 409
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword
      }
    });

    //const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        //user: rest,
        message: 'User created'
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
