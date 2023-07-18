import React, { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Balancer } from 'react-wrap-balancer';
import { cn } from '@/lib/utils';

const textVariants = cva([], {
  variants: {
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-xl md:text-2xl',
      '3xl': 'text-2xl md:text-3xl',
      '4xl': 'text-3xl md:text-4xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-primary dark:text-secondary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      danger: 'text-danger',
      black: 'text-black dark:text-white',
      ghost: 'text-gray-400',
      white: 'text-white dark:text-black',
    },
  },
});

type TextStylesProps = VariantProps<typeof textVariants>;

export interface TextProps extends Omit<TextStylesProps, 'size' | 'weight' | 'color'> {
  variant?: `${NonNullable<TextStylesProps['size']>}/${NonNullable<
    TextStylesProps['weight']
  >}/${NonNullable<TextStylesProps['color']>}`;
  children?: ReactNode;
  className?: string;
}

const Text = ({ variant = 'base/normal/black', children, className }: TextProps) => {
  const [size, weight, color] = (variant as string).split('/') as [
    TextStylesProps['size'],
    TextStylesProps['weight'],
    TextStylesProps['color'],
  ];
  return (
    <div className={cn(textVariants({ size, weight, color, className }))}>
      <Balancer>{children}</Balancer>
    </div>
  );
}

export {Text};