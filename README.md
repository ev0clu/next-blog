# **Next.js Blog**

A basic blog app has built with Next.js framework. The app allows users to log in in order to write comments under any posts.

### Demo: [Link](https://next-blog-eight-azure.vercel.app/)

## How run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Create .env file and add a new enviromental variable named DATABASE_URL with your own MongoDB connection link, add NEXTAUTH_SECRET variable with open ssl key and also add CODE="3.1415" variable
4. Run `npx prisma generate`
5. Run `npm run dev` command in your terminal
6. Server running at `http://localhost:3000/`

## Features

- Allow user to register, log in and log out
- Only logged in users have rights to write comments
- Only users with admin rights can create a new post
- User with admin rights can remove/update posts and comments
- User without admin rigths can remove/update comments which have written by himself/herself
- Posts and comments update date has shown
- Next.js used for CSR and SSR
- MongoDB used to store users, posts and comments informations
- Prisma ORM is used
- Bcrypt.js used to hash the user password
- Zod used for validation
- Render-as-you-fetch approach is used for Loading screen
- Hosted on Vercel
- Responsive design

### Useful links and informations

- Open SSL key generation:
  - You can use the following link to create open ssl key: `https://www.cryptool.org/en/cto/openssl` or you can install open ssl and generate key from terminal. To generate code you should run: `openssl rand -base64 32`
- Tailwind `prose` and `typography` handling are needed for markdowns:
  - [Stackoverflow](https://stackoverflow.com/questions/75706164/problem-with-tailwind-css-when-using-the-react-markdown-component)
  - [TailwindCSS official plugin](https://tailwindcss.com/docs/typography-plugin)
- Markdown editor needed to run in `use client` mode and need to be imported in dynamic to avoid navigator is not defined error:
  - [Stackoverflow](https://stackoverflow.com/questions/77301109/next-navigation-giving-error-navigator-is-not-defined)
  - [GitHub](https://github.com/RIP21/react-simplemde-editor/issues/30)
- React Hook Form usage with UI component needs to has `ref={null}` property to avoid ref warning:
  - [Stackoverflow](https://stackoverflow.com/questions/67877887/react-hook-form-v7-function-components-cannot-be-given-refs-attempts-to-access)
  - [GitHub](https://github.com/react-hook-form/react-hook-form/issues/3411)
- Loading screen approaches (Fetch-than-render, Render-as-you-fetch, Suspense, ):
  - [Medium.com](https://medium.com/jspoint/introduction-to-react-v18-suspense-and-render-as-you-fetch-approach-1b259551a4c0)
  - [Linkedin.com](https://www.linkedin.com/pulse/fetch-then-render-render-as-you-fetch-fetch-on-render-amit-pal/)

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
- [date-fns](https://date-fns.org/)

### Layout

![layout1 picture](https://github.com/ev0clu/next-blog/blob/main/layout1.png?raw=true)
![layout2 picture](https://github.com/ev0clu/next-blog/blob/main/layout2.png?raw=true)
![layout3 picture](https://github.com/ev0clu/next-blog/blob/main/layout3.png?raw=true)
