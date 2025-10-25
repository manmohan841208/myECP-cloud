"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"
import Image from "@/components/atoms/Image"
import { MinusCircle, AddCircle } from "@/assets/svg"
import Card from '@/components/atoms/Card'


function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // Header gets the red bottom border + rounding logic
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn(
        "p-2 flex w-auto bg-[var(--primary-color)] text-white",
        "border-b-[1.5px] border-[var(--accordion-bottom-border)]",
        "rounded-[8px]",
        // When the header CONTAINS a button[data-state=open] (the trigger), remove bottom radii
        "has-[button[data-state=open]]:rounded-b-none",
        "transition-[border-radius] duration-200"
      )}
    >
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group cursor-pointer outline-none",
          "flex flex-1 items-start justify-between gap-4 rounded-md",
          "text-left text-sm font-medium transition-all",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}

        {/* Toggle icon: Add when closed, Minus when open */}
        <span className="inline-flex items-center justify-center h-5 w-5 ">
          {/* closed → show Add */}
          <Image
            src={AddCircle}
            alt="Expand section"
            className="block group-data-[state=open]:hidden"
          />
          {/* open → show Minus */}
          <Image
            src={MinusCircle}
            alt="Collapse section"
            className="hidden group-data-[state=open]:block"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden "
      {...props}
    >
      <Card className={cn("mb-10 mx-[.5px] p-2 !rounded-none !rounded-b-[8px] ", className)}>
          {children}
      </Card>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
