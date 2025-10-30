
import React from 'react';
import NotAvailable from './notAvailable';


export default function HomePage() {
  return (
    
      <main className="flex gap-8 px-4 py-3 md:px-16">
        <NotAvailable 
        title="Home Page"
        description="We're crafting something great. Stay tuned!"
        />
      </main>
    
  );
}