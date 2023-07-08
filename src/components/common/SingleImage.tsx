import { cn } from '@/utils/cn';
import Image from 'next/image';
import React from 'react';

interface SingleImageProps {
  href?: string;
  imgSrc: string;
  className?: string;
}

const SingleImage: React.FC<SingleImageProps> = ({ href, imgSrc, className }) => {
  return (
    <>
      <a href={href} className={cn('flex items-center justify-center relative', className)}>
        <Image src={imgSrc} alt={'placholder'} fill />
      </a>
    </>
  );
};

export default SingleImage;
