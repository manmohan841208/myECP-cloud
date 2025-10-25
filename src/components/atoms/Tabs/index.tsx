// components/CustomTabs.tsx
"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";

const tabs = [
  { label: "Recent Activity" },
  { label: "Payment History" },
  { label: "Statements" },
  { label: "Rewards Activity" },
];

export default function CustomTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex space-x-2 bg-[var(--color-white)] p-4">
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={clsx(
              "flex items-center space-x-1 px-4 py-2 rounded-t transition-colors duration-200",
              isActive
                ? "bg-[var(--selected-tab-background)] text-[var(--color-white)]"
                : "bg-[var(--color-blue-light)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--color-white)]"
            )}
          >
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
