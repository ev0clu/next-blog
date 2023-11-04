import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/'
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username'
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const existUserByEmail = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!existUserByEmail) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existUserByEmail.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existUserByEmail.id,
          username: existUserByEmail.username,
          email: existUserByEmail.email
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username
        }
      };
    }
  }
};
