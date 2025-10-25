import React from "react";
// import { Button } from "@/components/ui/button";
import { DynamicTooltip } from "@/components/atoms/Tooltip/index";


export default function HomePage() {
  

  return (
<div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Tooltip</h3>
         <DynamicTooltip 
          content="Tooltip text"
          className="bg-black rounded-[4px]"
          side="top"
          align="center"
        >
          <button className="border p-2">Hover me</button>
        </DynamicTooltip>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tooltip with right Header</h3>
         <DynamicTooltip 
          content="Tooltip text"
          className="bg-black rounded-[4px]"
          side="right"
          align="center"
        >
          <button className="border p-2">Hover me</button>
        </DynamicTooltip>
      </div>

            <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tooltip with bottom Header</h3>
         <DynamicTooltip 
          content="Tooltip text"
          className="bg-black rounded-[4px]"
          side="bottom"
          align="center"
        >
          <button className="border p-2">Hover me</button>
        </DynamicTooltip>
      </div>

            <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tooltip with Left Header</h3>
         <DynamicTooltip 
          content="Tooltip text"
          className="bg-black rounded-[4px]"
          side="left"
          align="center"
        >
          <button className="border p-2">Hover me</button>
        </DynamicTooltip>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">This is a Tooltip with custom styling applied.</h3>
        <DynamicTooltip 
          content="This is a Cutomizable Tooltip with custom styling applied."
          className="bg-blue-500 text-white p-2 rounded"
          side="top"   
          align="start"
        >
           <button className="border p-2">Hover me</button>
         </DynamicTooltip>
        <p></p>

      </div>
    </div>
  );
}
      // <div className="flex items-center gap-4">
      //   {/* Example 1: Tooltip on a Button with simple text */}


      //   {/* Example 2: Tooltip with side position */}
      //   <DynamicTooltip 
      //     content="Tooltip text"
      //     className="bg-black rounded-[4px]"
      //     side="top"
      //     align="center"
      //   >
      //     <button className="border p-2">Hover me</button>
      //   </DynamicTooltip>
      // </div>