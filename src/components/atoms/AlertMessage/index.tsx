import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// Usage: <CustomAlert type="error" title="Error!" description="Something went wrong." />
export default function CustomAlert({
  type = "info",
  title,
  description,
  className,
}: {
  type?: "error" | "info" | "success";
  title?: string;
  description: string;
  className?: string;
}) {
  const colorMap = {
    error: "border-[var(--error-background)] text-[var(--error-background)]",
    info: "border-[var(--primary-color)] text-[var(--primary-color)]",
    success:
      "bg-[var(--success-background)] text-white border-none",
  };

  return (
    <Alert
      className={cn(
        "border-1 rounded px-4 py-3 flex flex-col gap-1",
        colorMap[type],
        className
      )}
    >
      {title && <AlertTitle className="font-semibold">{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}
