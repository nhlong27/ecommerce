'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from '@/utils/anim';
import Nav from './nav/Nav';
import helper from '@/constants/helper';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='sticky z-10 top-0 py-4 w-full bg-white'>
      <div className='flex w-11/12 mx-auto'>
        <Link role='title' href='/'>EcommerceSite</Link>
        <div
          
          className='grid place-items-center grow'
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? (
            <button role='menu-toggle' onClick={() => setIsActive(false)}>Close</button>
          ) : (
            <button role='menu-toggle' onClick={() => setIsActive(true)}>Menu</button>
          )}
        </div>
        <motion.div
          className='ml-auto flex gap-4'
          variants={opacity}
          animate={!isActive ? 'open' : 'closed'}
        >
          <Link href='/shop' role='shop-link'>Shop</Link>
          <Link href='/user/cart' role='cart-link' className='flex gap-2'>
            {helper.icon.shop}
            <p>(0)</p>
          </Link>
        </motion.div>
      </div>
      <AnimatePresence mode='wait'>{isActive && <Nav />}</AnimatePresence>
      {/* <motion.div
        variants={background}
        initial='initial'
        animate={isActive ? 'open' : 'closed'}
      ></motion.div> */}
    </div>
  );
}
