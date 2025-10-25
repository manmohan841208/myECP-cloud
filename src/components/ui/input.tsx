import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        " px-1 border-[1.35px] text-base rounded focus:outline-none min-h-[56px] w-full md:max-w-[382px] text-black min-w-0 focus:border-2 focus:border-[var(--color-blue)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
