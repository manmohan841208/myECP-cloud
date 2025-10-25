// components/ui/CustomCheckbox.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CustomCheckboxProps = {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
};

export default function CustomCheckbox({
  label,
  checked,
  onChange,
  className = "",
  id = "custom-checkbox",
}: CustomCheckboxProps) {
  return (
    <div className={`flex items-center space-x-2 ${className} `}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-[var(--color-black)] cursor-pointer data-[state=checked]:text-[var(--color-white)] border-2 "
      />
      {label && (
        <Label
          htmlFor={id}
          className="text-md font-medium text-[var(--color-black)]"
        >
          {label}
        </Label>
      )}
    </div>
  );
}
