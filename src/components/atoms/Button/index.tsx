import React from 'react';
import { Button as UIButton } from '@/components/ui/button';

type UIButtonVariant =
  | 'default'
  | 'secondary'
  | 'primary'
  | 'disable'
  | 'outline'
  | null
  | undefined;

interface ButtonProps {
  variant?: UIButtonVariant;
  children: React.ReactNode;
  onClick?: (e: any) => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <UIButton
      variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </UIButton>
  );
};

export default Button;
