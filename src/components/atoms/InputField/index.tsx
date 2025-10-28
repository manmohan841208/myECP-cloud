import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import Image from '@/components/atoms/Image';
import { TooltipBlue } from '@/assets/svg';
import { DynamicTooltip } from '@/components/atoms/Tooltip';

interface InputFieldProps extends React.ComponentProps<'input'> {
  label?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  mandantory?: boolean;
  help?: string;
  helpWidth?: string | number;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconLeft,
  iconRight,
  error,
  mandantory,
  className,
  help,
  helpWidth,
  placeholder = '',
  ...props
}) => {
  const hasError = error !== undefined;

  return (
    <div className="flex flex-col gap-2">
      {/* Render label if it's not undefined, and apply fixed height */}
      {label !== undefined && (
        <label
          className={cn(
            'flex h-5 items-center text-sm font-medium', // Fixed height added here
            hasError ? 'text-[var(--text-error)]' : 'text-[var(--text)]',
          )}
        >
          {label}
          {mandantory && (
            <span className="ml-1 text-[var(--text-error)]">*</span>
          )}

          {help && (
            <span className="ml-1">
              <DynamicTooltip
                className={`rounded-[4px] bg-black ${helpWidth}`}
                side="top"
                align="center"
                content={help}
              >
                <Image src={TooltipBlue} alt="blue-tooltip" />
              </DynamicTooltip>
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-grey-medium)]">
            {iconLeft}
          </div>
        )}
        <Input
          className={cn(
            'pl-4',
            iconLeft && 'pl-10',
            iconRight && 'pr-10',
            hasError &&
              'border-[var(--error-border)] focus-visible:border-[var(--error-border)]',
            className,
          )}
          aria-invalid={hasError}
          placeholder={placeholder}
          {...props}
        />
        {iconRight && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-grey-medium)]">
            <Image src={iconRight as string} alt="img" />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-[var(--text-error)]">{error}</p>}
    </div>
  );
};

export { InputField };
