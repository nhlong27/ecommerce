import React from 'react';
import dynamic from 'next/dynamic';

const Nav = dynamic(() => import('./Nav'), { ssr: false });

export default function Header() {
  return (
    <div
      className={`sticky z-20 top-0 w-full h-12 md:h-16 transition-all duration-300 text-md tracking-wider font-semibold bg-white dark:bg-black`}
    >
      <Nav />
    </div>
  );
}
