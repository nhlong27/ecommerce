import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100',
  {
    variants: {
      variant: {
        default:
          '',
        primary:
          'bg-primary inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10',
        destructive:
          'bg-warning inline-flex items-center justify-center rounded-md py-4 px-10 text-center text-base font-normal text-white hover:bg-danger lg:px-8 xl:px-10',
        destructiveOutline:
          'text-danger border-warning hover:bg-danger hover:border-danger inline-flex items-center justify-center rounded-md border py-4 px-10 text-center text-base transition hover:text-white lg:px-8 xl:px-10',
        outline:
          'text-primary border-primary hover:bg-primary hover:border-primary inline-flex items-center justify-center rounded-md border py-4 px-10 text-center text-base transition hover:text-white lg:px-8 xl:px-10',
        subtle:
          'text-secondary hover:text-primary inline-flex items-center justify-center rounded-[5px] bg-white py-3 px-6 text-center text-base font-medium',
        ghost:
          'text-gray-400 border-gray-400  hover:border-gray-800 hover:text-gray-800  inline-flex items-center justify-center rounded-md border py-4 px-10 text-center text-base transition lg:px-8 xl:px-10',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonStylesProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStylesProps {
  href?: string;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps> (
  ({ className, children, href, variant, size, disabled, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className }))}>
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

export default Button;
