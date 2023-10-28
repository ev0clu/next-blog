import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <Link
        href="/"
        className="bg-gradient-to-r from-teal-500 to-indigo-400 bg-clip-text text-3xl font-extrabold text-transparent"
      >
        WebDev Blog
      </Link>
      <div className="flex flex-row items-center gap-4">
        <ThemeToggle />
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
