"use client";

import React from "react";
import Button from '@/components/atoms/Button';


const ButtonExample = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default Button</h3>
        <Button>Default Button</Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Button</h3>
        <Button variant="primary">Primary Button</Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Secondary Button</h3>
        <Button variant="secondary">Secondary Button</Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Outline Button</h3>
        <Button variant="outline">Outline Button</Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled Button</h3>
        <Button variant="disable">Disabled Button</Button>
      </div>
    </div>
  );
};

export default ButtonExample;
