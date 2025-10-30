import React from 'react';

export default function NotAvailable({ title, description }: any) {
  return (
    <div className="flex h-screen items-center justify-center bg-white text-gray-800">
      <div className="px-4 text-center">
        <h1 className="mb-2 text-4xl font-semibold">{title}</h1>
        <p className="text-md text-gray-500">{description}</p>
      </div>
    </div>
  );
}
