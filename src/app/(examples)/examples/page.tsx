"use client";

import React, { useState } from "react";
import { UpArrow, DownArrow } from "@/assets/svg";
import Image from "@/components/atoms/Image";
import ButtonExample from "@/components/atoms/Button/example";
import TooltipExample from "@/components/atoms/Tooltip/example";
import CardExample from "@/components/atoms/Card/example";
import AlertMessageExample from "@/components/atoms/AlertMessage/example";

const categories: { [key: string]: string[] } = {
  Atoms: ["Button", "Tooltip", "Card", "Alert Message"],
  Molecules: ["Molecule1", "Molecule2"],
  Organisms: ["Organism1", "Organism2"],
};

const componentMap: { [key: string]: React.ComponentType } = {
  Button: ButtonExample,
  Tooltip: TooltipExample,
  Card: CardExample,
  "Alert Message": AlertMessageExample,
};

export default function Example() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const ExampleComponent = selectedComponent
    ? componentMap[selectedComponent]
    : null;

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow px-6 py-[1px] flex justify-between items-center">
        {/* <div className="text-2xl font-mono">AAFES</div> */}
      </nav>

      {/* Sidebar and Content */}
      <div className="flex flex-1">
        <aside className="bg-blue-200 w-[20%] p-4 text-white">
          {Object.entries(categories).map(([category, items]) => {
            const isOpen = expandedCategory === category;
            return (
              <div key={category} className="mb-2">
                <button
                  onClick={() => setExpandedCategory(isOpen ? null : category)}
                  className="cursor-pointer w-full decoration-blue-700 text-black text-left font-semibold py-2 hover:underline flex items-center justify-between"
                >
                  <span>{category}</span>
                  <span>
                    {isOpen ? (
                      // <Image src={UpArrow} alt="up-arrow" />
                      <Image src={DownArrow} className={'rotate-180'} alt="down-arrow" />

                    ) : (
                      <Image src={DownArrow} alt="down-arrow" />
                    )}
                  </span>
                </button>
                {isOpen && items.length > 0 && (
                  <ul className="ml-4">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="cursor-pointer flex justify-start gap-1 items-center"
                      >
                        <span className="flex justify-center items-center">
                          ➜
                        </span>
                        <button
                          onClick={() => setSelectedComponent(item)}
                          className="cursor-pointer text-black font-bold text-sm py-1 hover:underline decoration-red-500"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)]">
  <h2 className="text-2xl font-bold mb-4">Components Overview</h2>
  {selectedComponent ? (
    <div className="p-6 border rounded-lg shadow bg-white">
      <h3 className="text-xl font-bold mb-6">
        {selectedComponent} Examples
      </h3>
      <div className="space-y-8">
        {ExampleComponent && <ExampleComponent />}
      </div>
    </div>
  ) : (
    <p>
      Select a component from the sidebar to view its examples and
      implementation.
    </p>
  )}
</main>
      </div>
    </div>
  );
}
