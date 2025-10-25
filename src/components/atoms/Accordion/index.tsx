"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type CustomAccordionProps = {
  /** What you see in the trigger/header */
  header: React.ReactNode
  /** Body content */
  children: React.ReactNode
  /** Open by default? */
  defaultOpen?: boolean
  /** Unique value for Radix. Defaults to "item-1" */
  value?: string
  /** Accordion behavior */
  collapsible?: boolean
  /** Class overrides (optional) */
  className?: string
  itemClassName?: string
  triggerClassName?: string
  contentClassName?: string
  /** Keep as "single" unless you have a reason to change it */
  type?: "single" | "multiple"
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  header,
  children,
  defaultOpen = false,
  value = "item-1",
  collapsible = true,
  type = 'single',
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}) => {
  return (
    <Accordion
      type="single"
      collapsible={collapsible}
      defaultValue={defaultOpen ? value : undefined}
      className={cn(className)}
    >
      <AccordionItem value={value} className={cn(itemClassName)}>
        <AccordionTrigger className={cn(triggerClassName)}>
          {header}
        </AccordionTrigger>
        <AccordionContent className={cn(contentClassName)}>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CustomAccordion
