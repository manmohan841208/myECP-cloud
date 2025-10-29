import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const hasWidthClass = className?.includes("w-") || className?.includes("!w-");

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "px-1 border-[1.35px] text-[15px] rounded focus:outline-none min-h-[56px] text-black min-w-0 focus:border-2 focus:border-[var(--color-blue)]",
        !hasWidthClass && "w-[382px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };