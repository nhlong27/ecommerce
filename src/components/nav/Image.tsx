import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { opacity } from '@/utils/anim';

type NavImageProps = {
  src: string;
  isActive: boolean;
};

export default function NavImage({ src, isActive }: NavImageProps) {
  return (
    <motion.div className='relative' variants={opacity} initial='initial' animate={isActive ? 'open' : 'closed'}>
      <Image src={`/images/${src}`} fill={true} alt='image' />
    </motion.div>
  );
}
