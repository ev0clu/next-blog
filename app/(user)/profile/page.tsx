import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="mt-5 flex flex-1 flex-col items-center">
      <div className="p-10">
        <h1 className="mb-5 text-3xl font-extrabold">Profile</h1>
        <p>
          <b>Username:</b> {session?.user.username}
        </p>
        <p>
          <b>Email:</b> {session?.user.email}
        </p>
        <p>
          <b>Role:</b> {session?.user.role}
        </p>
        {session?.user.role !== 'ADMIN' && (
          <p className="mt-3">
            Do you want to be Admin?{' '}
            <Link className="text-blue-500 underline" href="/admin">
              Click here
            </Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default Profile;
