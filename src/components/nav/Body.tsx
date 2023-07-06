import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '@/utils/anim';

type BodyProps = {
  links: Record<string, string>[];
  selectedLink: { isActive: boolean; index: number };
  setSelectedLink: (value: { isActive: boolean; index: number }) => void;
};

export default function Body({ links, selectedLink, setSelectedLink }: BodyProps) {
  const getChars = (word: string) => {
    let chars: React.JSX.Element[] = [];
    word.split('').forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial='initial'
          animate='enter'
          exit='exit'
          key={char + i}
        >
          {char}
        </motion.span>,
      );
    });
    return chars;
  };

  return (
    <div className='flex flex-wrap h-40 gap-8'>
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link className='w-16 h-16 uppercase' key={`l_${index}`} href={href}>
            <motion.p
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index });
              }}
              variants={blur}
              animate={selectedLink.isActive && selectedLink.index != index ? 'open' : 'closed'}
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
