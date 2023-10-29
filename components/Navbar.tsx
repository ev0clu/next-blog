'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeContext } from '@/context/ThemeContext';
import React, {
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!toggleDropdown) return;
    function handleOutisdeClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggleDropdown(false);
      }
    }
    window.addEventListener('mousedown', handleOutisdeClick);
    // clean up
    return () => {
      window.removeEventListener('mousedown', handleOutisdeClick);
    };
  }, [toggleDropdown]);

  const isLoggedIn = false;

  return (
    <nav className="flex flex-row items-center">
      {/* Desktop Navigation */}
      <div className="hidden gap-2 sm:flex">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className={`${
                theme == 'light'
                  ? 'bg-slate-900 px-4 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 px-4 text-slate-900 hover:bg-slate-300'
              } rounded-full py-2`}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className={`${
                theme == 'light'
                  ? 'bg-slate-900 px-4 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 px-4 text-slate-900 hover:bg-slate-300'
              } rounded-full py-2`}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              className={`${
                theme == 'light'
                  ? 'bg-slate-900 px-4 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 px-4 text-slate-900 hover:bg-slate-300'
              } rounded-full py-2`}
            >
              Profile
            </Link>
            <Link
              href="/api/auth/signout"
              className={`${
                theme == 'light'
                  ? 'bg-slate-900 px-4 text-slate-100 hover:bg-slate-600'
                  : 'bg-slate-100 px-4 text-slate-900 hover:bg-slate-300'
              } rounded-full py-2`}
            >
              Log out
            </Link>
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="relative flex gap-2 sm:hidden">
        <button
          onClick={() => setToggleDropdown((prevValue) => !prevValue)}
        >
          <FiMenu />
        </button>
        {toggleDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-7 flex w-max flex-col items-start gap-2 rounded bg-slate-100 p-1 px-4 py-2 text-sm text-slate-950"
          >
            {!isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    router.push('/login');
                    setToggleDropdown(false);
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push('/register');
                    setToggleDropdown(false);
                  }}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  router.push('/');
                  setToggleDropdown(false);
                }}
              >
                Log out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
