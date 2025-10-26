'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from '@/components/atoms/Image';
import {
  TagLineLogo,
  MilitryStarLogo,
  HamburgerMenu,
} from '@/assets/svg/index';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/store/store';
import { login, logout, setAuthFromStorage } from '@/store/slices/authSlice';
import { clearSession } from '@/lib/session';

export default function Navbar() {
  const navLinks = useSelector((state: RootState) => state.navigation.navLinks);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [selectedBTN, setSelectedBTN] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setAuthFromStorage(!!token));
  }, [dispatch]);

  const logOut = () => {
    localStorage.removeItem('token');
    clearSession();
    dispatch(logout());
    router.push('/login');
  };

  return (
    <nav className="navbar relative flex items-center justify-between px-4 shadow-md md:px-16">
      <div className="flex w-full items-center gap-4 py-3.5 md:gap-6">
        <Link href="/">
          <Image src={MilitryStarLogo} alt="Logo" className="cursor-pointer" />
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <span
                  className={`text-(--text) transition hover:text-blue-600 ${
                    selectedBTN === link.name ? 'font-extrabold' : ''
                  }`}
                  onClick={() => setSelectedBTN(link.name)}
                  style={{ cursor: 'pointer' }}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
          {!isLoggedIn && (
            <li>
              <Link href={'/login'}>
                <span
                  className={`hover:text-blue-600'font-extrabold text-(--text) transition`}
                  onClick={() => setSelectedBTN('Login')}
                  style={{ cursor: 'pointer' }}
                >
                  {'Login'}
                </span>
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              {/* <Link href={'#'}> */}
              <span
                className={`hover:text-blue-600'font-extrabold text-(--text) transition`}
                onClick={() => logOut()}
                style={{ cursor: 'pointer' }}
              >
                {'Logout'}
              </span>
              {/* </Link> */}
            </li>
          )}
        </ul>
      </div>
      <Image
        src={TagLineLogo}
        alt="Tag-line-Logo"
        className="hidden md:block"
      />
      {/* Hamburger Icon for Mobile */}
      <Button
        className="bg-transparent p-2 !outline-none md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
      >
        <Image src={HamburgerMenu} alt="Menu" />
      </Button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 z-50 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>
                  <span
                    className={`block text-gray-700 transition hover:text-blue-600 ${
                      selectedBTN === link.name ? 'font-extrabold' : ''
                    }`}
                    onClick={() => {
                      setSelectedBTN(link.name);
                      setMenuOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
