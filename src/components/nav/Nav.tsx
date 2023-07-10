import { RefAttributes, useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '@/utils/anim';
import Body from './Body';
import Footer from './Footer';
import NavImage from './Image';
import React from 'react'
const links = [
  {
    title: 'Category 1',
    href: '/catalogue',
    src: 'home.png',
  },
  {
    title: 'Category 2',
    href: '/catalogue',
    src: 'shop.png',
  },
  {
    title: 'Category 3',
    href: '/catalogue',
    src: 'home.png',
  },
  {
    title: 'Category 4',
    href: '/catalogue',
    src: 'contact.png',
  },
];

const Nav = React.forwardRef<HTMLDivElement> (({}, ref) => {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div
      ref={ref}
      className='w-full pt-12 pb-8 shadow-sm bg-white text-black'
      variants={height}
      initial={{y: 0, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      exit={{y: 0, opacity: 0}}
    >
      <div className='flex flex-col md:grid md:grid-cols-3 w-5/6 mx-auto gap-8'>
        <div className='col-span-2 flex gap-8'>
          <div className='grid grid-cols-3 grow'>
            <div>Category</div>
            <div>Category</div>
            <div>Category</div>
          </div>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
        </div>

        <NavImage src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
      </div>
    </motion.div>
  );
} )

export default Nav;