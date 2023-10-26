import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

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
        message: 'Something went wrong'
      },
      { status: 500 }
    );
  }
}
