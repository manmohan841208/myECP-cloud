import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-orange-800 rounded px-3 py-[10px] font-[Arial,sans-serif]',
        primary:
          'px-[12px] py-[10px] shadow font-bold rounded-[4px] bg-[var(--primary-color)] text-white font-[Arial,sans-serif] ',
        secondary:
          'px-[12px] py-[10px] shadow font-bold rounded-[4px] bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-color)]/80 font-[Arial,sans-serif]',
        disable:
          'px-[12px] py-[10px] shadow font-bold rounded-[4px] bg-[var(--disabled-color)] text-black cursor-not-allowed font-[Arial,sans-serif] !opacity-100',
        outline:
          'px-[12px] py-[10px] shadow font-bold rounded-[4px] border text-[var(--color-blue)] font-[Arial,sans-serif]',
      },
      
      size: {
        default: 'h-9 px-3 py-[10px] has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled = false,
  ...props
}: React.ComponentProps<'button'> &
  any & {
    asChild?: boolean;
    disabled?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  // If disabled, force variant to 'disable'
  const appliedVariant = disabled ? 'disable' : variant;

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant: appliedVariant, size, className }),
      )}
      disabled={disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
