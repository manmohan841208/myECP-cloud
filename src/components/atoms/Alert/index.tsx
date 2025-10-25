import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Info, X, AlertCircle, CheckCircle } from "lucide-react";

type Variant = "info" | "error" | "success";

const variantStyles: Record<
  Variant,
  { bg: string; text: string; icon: React.ReactElement }
> = {
  info: {
    bg: "bg-[var(--primary-color)]",
    text: "text-[var(--primary-color)]",
    icon: <Info className="w-6 h-6" />,
  },
  error: {
    bg: "bg-[var(--error-background)]",
    text: "text-[var(--error-background)]",
    icon: <AlertCircle className="w-6 h-6" />,
  },
  success: {
    bg: "bg-[var(--success-background)]",
    text: "text-[var(--success-background)]",
    icon: <CheckCircle className="w-6 h-6" />,
  },
};

export function VariantAlert({
  variant = "info",
  title,
  description,
  onClose,
}: {
  variant?: Variant;
  title: string;
  description: string;
  onClose?: () => void;
}) {
  const { bg, text, icon } = variantStyles[variant];

  return (
    <Alert
      className={cn(
        bg,
        "text-white rounded p-4 flex items-center justify-between"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("bg-white rounded-full p-2", text)}>{icon}</div>
        <div>
          <AlertTitle className="text-white text-sm font-semibold">
            {title}
          </AlertTitle>
          <AlertDescription className="text-white text-sm">
            {description}
          </AlertDescription>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-[var(--color-grey-medium)] text-xl font-bold focus:outline-none"
      >
        <X className="w-5 h-5" />
      </button>
    </Alert>
  );
}
// ...existing code...
