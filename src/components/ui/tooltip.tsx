'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

type TooltipContextType = {
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const TooltipHoverContext = React.createContext<TooltipContextType | null>(
  null,
);

function useTooltipHover() {
  const ctx = React.useContext(TooltipHoverContext);
  if (!ctx) {
    throw new Error('useTooltipHover must be used within Tooltip');
  }
  return ctx;
}

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const [open, setOpen] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const onOpenChange = (v: boolean) => {
    // If user is hovering, keep tooltip open even if an interaction tries to close it (e.g. a stray click)
    if (isHovering && !v) return;
    setOpen(v);
  };

  return (
    <TooltipHoverContext.Provider
      value={{ isHovering, setIsHovering, open, setOpen }}
    >
      <TooltipProvider>
        <TooltipPrimitive.Root
          data-slot="tooltip"
          open={open}
          onOpenChange={onOpenChange}
          {...props}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipProvider>
    </TooltipHoverContext.Provider>
  );
}

function TooltipTrigger({
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const { setIsHovering, setOpen } = useTooltipHover();

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovering(true);
    setOpen(true);
    onMouseEnter?.(e as any);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsHovering(false);
    setOpen(false);
    onMouseLeave?.(e as any);
  };

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  const { setIsHovering } = useTooltipHover();

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovering(true);
    onMouseEnter?.(e as any);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsHovering(false);
    onMouseLeave?.(e as any);
  };

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-150 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className="bg-foreground fill-foreground z-50 h-[7px] w-[15px] translate-y-[calc(-50%_-_-2.5px)] rounded-[12px]"
          style={{}}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
