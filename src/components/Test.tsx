import helper from '@/constants/helper';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';
export const projects = [
  {
    name: 'Google Pixel Creator Labs',
    client: 'Grow',
    description: 'A partnership between Google & SN37.',
    src: helper.images.commercial3,
    year: 2023,
  },
  {
    name: 'Decimal',
    client: 'Decimal',
    description: 'Portfolio site for Decimal.',
    src: helper.images.commercial5,
    year: 2023,
  },  
];

export default function Home() {
  return (
    <main className='w-full h-full ring-2 ring-primary'>
        <Double projects={[projects[0], projects[1]]} />
    </main>
  );
}

type Double = {
  projects: {
    name: string;
    client: string;
    description: string;
    src: string | StaticImageData;
    year: number;
  }[];
  reversed?: boolean;
};
export function Double({ projects, reversed }: Double) {
  const firstImage = useRef<HTMLDivElement | null>(null);
  const secondImage = useRef<HTMLDivElement | null>(null);
  let requestAnimationFrameId: any = null;
  let xPercent = reversed ? 100 : 0;
  let currentXPercent = reversed ? 100 : 0;
  const speed = 0.15;

  const manageMouseMove = (e: any) => {
    const { clientX } = e;
    xPercent = (clientX / window.innerWidth) * 100;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = window.requestAnimationFrame(animate);
    }
  };

  const animate = () => {
    //Add easing to the animation
    const xPercentDelta = xPercent - currentXPercent;
    currentXPercent = currentXPercent + xPercentDelta * speed;

    //Change width of icon.logo.33% and 66.66% based on cursor
    const firstImagePercent = 66.66 - currentXPercent * 0.33;
    const secondImagePercent = 33.33 + currentXPercent * 0.33;
    if (firstImage.current && secondImage.current) {
      firstImage.current.style.width = `${firstImagePercent}%`;
      secondImage.current.style.width = `${secondImagePercent}%`;
    }

    if (Math.round(xPercent) == Math.round(currentXPercent)) {
      window.cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    } else {
      window.requestAnimationFrame(animate);
    }
  };

  return (
    <div
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className='flex w-full h-full'
    >
      <div ref={firstImage} className='relative'>
        <div className='relative w-full h-full'>
          <Image src={projects[0].src} className='object-cover' fill alt={'image'} />
        </div>
        <div className='absolute top-0 text-white'>
          <h3>{projects[0].name}</h3>
          <p>{projects[0].description}</p>
          <p>{projects[0].year}</p>
        </div>
      </div>

      <div ref={secondImage} className='relative'>
        <div className='relative w-full h-full'>
          <Image src={projects[1].src} className='object-cover' fill alt={'image'} />
        </div>
        <div className='absolute top-0 text-white'>
          <h3>{projects[1].name}</h3>
          <p>{projects[1].description}</p>
          <p>{projects[1].year}</p>
        </div>
      </div>
    </div>
  );
}
