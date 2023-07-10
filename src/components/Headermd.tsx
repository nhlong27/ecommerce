import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import helper from '@/constants/helper';
import Button from './common/Button';
import Nav from './nav/Nav';
import SingleImage from './common/SingleImage';
import { useRouter } from 'next/router';
import React from 'react';
import Navmd from './nav/Navmd';

export default function Headermd() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const [navBg, setNavBg] = useState(false);

  const changeNavBg = () => {
    window.scrollY > 0 ? setNavBg(true) : setNavBg(false);
  };

  const dropDownMenu = React.useRef<HTMLDivElement | null>(null);

  const closeOpenMenus = (e: MouseEvent) => {
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
      className={`md:hidden sticky z-20 top-0 w-full  transition-all duration-300 text-md  tracking-wider font-semibold ${
        navBg ? 'bg-primary h-16 text-tertiary' : 'bg-white h-20 '
      }`}
    >
      <nav className='z-20 flex w-11/12 h-full mx-auto border-b-2 border-primary/30 gap-4'>
        <button
          className='flex z-30 justify-center items-center  h-full'
          onClick={() => setIsActive((prev) => !prev)}
        >
          <svg
            width='30'
            height='30'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={`cursor-pointer transition-all duration-300 ${
              isActive ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <path
              d='M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <SingleImage href='/' src={helper.icon.logo} className='w-[7rem] h-full z-40' />

        <div className='flex justify-center items-center ml-auto gap-4'>
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
      <div
        className={`bg-white fixed left-0 top-0 bottom-0 transition-all duration-300 px-4 shadow-sm ${
          isActive ? 'min-w-[15rem] z-10 opacity-100' : '-z-10 min-w-0 opacity-0'
        }`}
      >
        <Navmd ref={dropDownMenu} />
      </div>
    </div>
  );
}
