import { cn } from '@/utils/cn';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface SingleImageProps {
  href?: string;
  src: string | StaticImageData;
  className?: string;
}

const SingleImage: React.FC<SingleImageProps> = ({ href, src, className }) => {
  return (
    <a href={href} className={cn('flex items-center justify-center relative', className)}>
      <Image src={src} alt={'placholder'} fill />
    </a>
  );
};

export default SingleImage;
