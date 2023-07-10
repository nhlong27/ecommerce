import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import helper from '@/constants/helper';
import Button from './common/Button';
import Nav from './nav/Nav';
import SingleImage from './common/SingleImage';
import { useRouter } from 'next/router';
import React from 'react';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const [navBg, setNavBg] = useState(false);
  const changeNavBg = () => {
    window.scrollY > 0 ? setNavBg(true) : setNavBg(false);
  };

  const dropDownMenu = React.useRef<HTMLDivElement | null>(null);

  const closeOpenMenus = (e: MouseEvent) => {
    e.stopPropagation()
    if (dropDownMenu.current && isActive && !dropDownMenu.current.contains(e.target as Node)) {
      setIsActive(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    window.addEventListener('mousedown', closeOpenMenus);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
      window.removeEventListener('mousedown', closeOpenMenus);
    };
  }, []);

  return (
    <div
      className={`hidden md:block sticky z-20 top-0 w-full  transition-all duration-300 text-md  tracking-wider font-semibold ${
        navBg ? 'bg-primary h-12 text-tertiary' : 'bg-white h-20 '
      }`}
    >
      <nav className='flex w-11/12 h-full mx-auto border-b-2 border-primary/30'>
        <SingleImage href='/' src={helper.icon.logo} className='w-[7rem] h-full' />
        <div className='flex justify-center items-center mr-auto ml-[2.5rem] gap-12 h-full mt-[2px]'>
          <Link
            className={`inline-flex items-center justify-center h-full transition-full duration-300 ${
              router.pathname === '/'
                ? navBg
                  ? 'text-white'
                  : 'text-primary border-b-2 border-primary'
                : navBg
                ? 'hover:text-secondary'
                : 'hover:text-neutral/30'
            }`}
            href='/'
          >
            Home
          </Link>
          <button
            className={`inline-flex tracking-wider items-center justify-center h-full transition-full duration-300 ${
              router.pathname === '/catalogue'
                ? navBg
                  ? 'text-white'
                  : 'text-primary border-b-2 border-primary'
                : navBg
                ? 'hover:text-secondary'
                : 'hover:text-neutral/30'
            }`}
            onClick={() => setIsActive((prev) => !prev)}
          >
            Catalogue
          </button>
          <Link
            className={`inline-flex items-center justify-center h-full transition-full duration-300 ${
              router.pathname === '/about'
                ? navBg
                  ? 'text-white'
                  : 'text-primary border-b-2 border-primary'
                : navBg
                ? 'hover:text-secondary'
                : 'hover:text-neutral/30'
            }`}
            href='/about'
          >
            About
          </Link>
          <div
            className={`inline-flex tracking-wider items-center justify-center h-full transition-full duration-300 ${
               navBg ? 'hover:text-secondary'
                : 'hover:text-neutral/30'
            }`}
            onClick={() => setIsActive(true)}
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
        <div className='flex justify-center items-center ml-auto gap-4'>
          <Link
            className={`inline-flex items-center justify-center h-full transition-full duration-300 ${
              router.pathname === '/auth'
                ? navBg
                  ? 'text-white'
                  : 'text-primary border-b-2 border-primary'
                : navBg
                ? 'hover:text-secondary'
                : 'hover:text-neutral/30'
            }`}
            href='/auth'
          >
            Sign in
          </Link>
          <div className='border-[1px] border-gray-200 h-2/5 my-auto'></div>
          <Button
            size='lg'
            variant='default'
            href='/user/cart'
            role='cart-link'
            className='flex gap-2 rounded-none h-full px-0 '
          >
            {helper.icon.shop}
            <p>(0)</p>
          </Button>
        </div>
      </nav>
      <AnimatePresence mode='sync'>{isActive && <Nav ref={dropDownMenu} />}</AnimatePresence>
    </div>
  );
}
