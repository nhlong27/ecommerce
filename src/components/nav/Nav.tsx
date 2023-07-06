import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '@/utils/anim';
import Body from './Body';
import Footer from './Footer';
import NavImage from './Image';

const links = [
  {
    title: 'Home',
    href: '/',
    src: 'home.png',
  },
  {
    title: 'Shop',
    href: '/shop',
    src: 'shop.png',
  },
  {
    title: 'About Us',
    href: '/aboutus',
    src: 'home.png',
  },
  {
    title: 'Contact',
    href: '/contact',
    src: 'contact.png',
  },
];

export default function Nav() {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div className='w-full py-4' variants={height} initial='initial' animate='enter' exit='exit'>
      <div className='flex flex-col md:grid md:grid-cols-3 w-11/12 mx-auto '>
        <div className='col-span-2 flex flex-col'>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
          <Footer />
        </div>

        <NavImage src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
      </div>
    </motion.div>
  );
}
