'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from '@/utils/anim';
import helper from '@/constants/helper';
import { Text } from './common/Text';
import Button from './common/Button';
import Nav from './nav/Nav';
import SingleImage from './common/SingleImage';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className='sticky z-20 top-0 py-6 w-full bg-white'>
      <nav className='flex w-11/12 mx-auto'>
        <SingleImage
          href='/'
          imgSrc={'https://cdn.tailgrids.com/1.0/assets/images/logo/logo.svg'}
          className='w-[10rem] h-11'
        />
        <div
          className='grid place-items-center grow'
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {isActive ? (
            <Button variant='subtle' size='lg' role='menu-toggle' onClick={() => setIsActive(false)}>
              Close
            </Button>
          ) : (
            <Button variant='subtle' size='lg' role='menu-toggle' onClick={() => setIsActive(true)}>
              Menu
            </Button>
          )}
        </div>
        <motion.div
          className='ml-auto flex gap-4'
          variants={opacity}
          animate={!isActive ? 'open' : 'closed'}
        >
          <Button size='lg' variant='default' href='/shop' role='shop-link'>
            Shop
          </Button>
          <Button size='lg' variant='default' href='/user/cart' role='cart-link' className='flex gap-2'>
            {helper.icon.shop}
            <p>(0)</p>
          </Button>
        </motion.div>
      </nav>
      <AnimatePresence mode='wait'>{isActive && <Nav />}</AnimatePresence>
      {/* <motion.div
        variants={background}
        initial='initial'
        animate={isActive ? 'open' : 'closed'}
      ></motion.div> */}
    </div>
  );
}
