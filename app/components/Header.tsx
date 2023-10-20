import Image from 'next/image';
import logo from '../../public/next.svg';
import Navbar from './Navbar';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <Link href="/" className="flex flex-row gap-2">
        <Image src={logo} width={96} height={36} alt="Logo" />
        <span className="text-2xl h-9 flex flex-row items-end">
          Blog
        </span>
      </Link>
      <Navbar />
    </div>
  );
};

export default Header;
