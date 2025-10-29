import React from "react";

export default function NotAvailable() {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-800">
      <div className="text-center px-4">
        <h1 className="text-4xl font-semibold mb-2">Coming Soon</h1>
        <p className="text-md text-gray-500">
          We're crafting something great. Stay tuned!
        </p>
      </div>
    </div>
  );
}