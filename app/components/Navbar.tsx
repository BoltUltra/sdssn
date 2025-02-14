'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HambergerMenu } from 'iconsax-react';
import Link from 'next/link';
import Image from 'next/image';
import { logo, logoDark, logoNew } from '@/public/images';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const { logout } = useAuthStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About SDSSN' },
    { href: '/membership', label: 'Membership' },
    { href: '/news-and-event', label: 'News & Events' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      setUser(storedUser);

      const storedAuth = JSON.parse(
        localStorage.getItem('isAuthenticated') || 'false'
      );
      setIsAuth(storedAuth);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = scrolled
    ? 'fixed top-0 left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-[99]'
    : 'fixed top-0 left-0 w-full bg-white transition-all duration-300 ease-in-out';

  return (
    <>
      <motion.nav
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 0.2, type: "spring" }}
        className={navbarClasses}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="container mx-auto md:px-20 px-5 py-4 flex justify-between items-center font-plus-jakarta">
            <Link href="/">
              <Image src={logoNew} alt="logo" className="md:w-32 w-20" />
            </Link>
            <ul
              className={`${
                scrolled ? 'text-primary' : 'text-primary'
              } hidden md:flex space-x-6`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex">
              {isAuth ? (
                <div className="relative">
                  <Image
                    src={
                      user?.picture?.asset?.url ||
                      `https://api.dicebear.com/9.x/identicon/svg?seed=${user?.first_name}`
                    }
                    height={70}
                    width={70}
                    className="rounded-full border-4 border-white mx-auto cursor-pointer"
                    alt="user-image"
                    unoptimized
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href="/dashboard/projects"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className={`${
                    scrolled
                      ? 'bg-primary text-white'
                      : 'bg-primary text-white border-primary'
                  } border-2 px-5 md:px-10 py-2 md:py-3 rounded-lg`}
                >
                  Join Us
                </Link>
              )}
            </div>

            <div className="md:hidden">
              {isAuth ? (
                <div className="relative flex items-center space-x-2">
                  <Image
                    src={
                      user?.picture?.asset?.url ||
                      `https://api.dicebear.com/9.x/identicon/svg?seed=${user?.first_name}`
                    }
                    height={40}
                    width={40}
                    className="rounded-full border-4 border-white mx-auto cursor-pointer"
                    alt="user-image"
                    unoptimized
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href="/dashboard/projects"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`${
                      scrolled ? 'text-primary-500' : 'text-white'
                    } text-2xl`}
                  >
                    <HambergerMenu size="32" color="#000000" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`${
                    scrolled ? 'text-primary-500' : 'text-white'
                  } text-2xl`}
                >
                  <HambergerMenu size="32" color="#000000" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 px-5 py-5 bg-white w-full z-50">
          <ul className="space-y-5">
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/about" className="">
                About SDSSN
              </Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/membership" className="">
                Membership
              </Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/news-and-event" className="">
                News & Events
              </Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/media" className="">
                Media
              </Link>
            </li>
            <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Link href="/contact" className="">
                Contact Us
              </Link>
            </li>
          </ul>
          {!isAuth && (
            <div className="flex space-x-5 mt-5">
              <Link
                href="/auth/login"
                className="text-black-800 border-primary-500 hover:bg-primary-500 border-2 rounded-lg px-5 md:px-10 py-2 md:py-3 hover:text-white transition-all duration-300 ease-in-out w-full text-center"
              >
                Login
              </Link>
              <Link
                href="auth/register"
                className="bg-primary text-white px-5 py-3 rounded-lg w-full text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
