# **Next.js Blog**

A basic blog app has built with Next.js framework. The app allows users to log in in order to comments under the posts and search for a specific post.

### Demo: [Link]()

## How run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Create .env file and add a new enviromental variable named DATABASE_URL with your own MongoDB connection link and also add NEXTAUTH_SECRET variable with open ssl key.
4. Run `npm run dev` command in your terminal
5. Server running at `http://localhost:3000/`

## Features

- Allow user to register, log in and log out
- Only logged in users have rights to write comments
- Next.js used for CSR and SSR
- MongoDB used to store users, posts and comments informations
- Prisma used for ODM
- Bcrypt.js used to hash the user password
- Zod used for validation
- Emotions can be set for each posts
- Hosted on Vercel
- Responsive design

### Useful links and informations

- Open SSL key generation:
  - You can use the following link to create open ssl key: `https://www.cryptool.org/en/cto/openssl` or you can install open ssl and generate key from terminal. To generate code you should run: `openssl rand -base64 32`
- Tailwind `prose` and `typography` handling are needed for markdowns:
  - [Stackoverflow](https://stackoverflow.com/questions/75706164/problem-with-tailwind-css-when-using-the-react-markdown-component)
  - [TailwindCSS official plugin](https://tailwindcss.com/docs/typography-plugin)
- Markdown editor needed to run in `use client` mode

### Dependencies

- [React](https://react.dev/)
- [React DOM](https://www.npmjs.com/package/react-dom)
- [React Icons](https://www.npmjs.com/package/react-icons)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Next Auth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [React Hook Form](https://react-hook-form.com/)
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- [Zod](https://zod.dev/)
- [SimpleMDE (EasyMDE)](https://www.npmjs.com/package/react-simplemde-editor)
- [React Markdown](https://www.npmjs.com/package/react-markdown)

### Layout

![layout picture](https://github.com/ev0clu/next-blog/blob/main/layout.png?raw=true)
