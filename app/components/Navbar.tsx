import Link from 'next/link';

const Navbar = () => {
  const isLoggedIn = false;
  return (
    <nav className="flex flex-row gap-2">
      <>
        {!isLoggedIn ? (
          <>
            <Link href="/login">Log in</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <Link href="/">Log out</Link>
        )}
      </>
    </nav>
  );
};

export default Navbar;
