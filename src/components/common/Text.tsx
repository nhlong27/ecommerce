//@ts-nocheck
import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Balancer } from 'react-wrap-balancer';

const textVariants = cva([], {
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-md',
      large: 'text-lg',
      XL: 'text-3xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      tertiary: 'text-tertiary',
      danger: 'text-danger',
      black: 'text-black',
      ghost: 'text-gray-400',
      white: 'text-white',
    },
  },
});

type TextStylesProps = VariantProps<typeof textVariants>;

export interface TextProps extends Omit<TextStylesProps, 'size' | 'weight' | 'color'> {
  variant: `${NonNullable<TextStylesProps['size']>}/${NonNullable<
    TextStylesProps['weight']
  >}/${NonNullable<TextStylesProps['color']>}`;
  children?: ReactNode;
  className?: string;
}

export function Text({ variant, children, className }: TextProps) {
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
