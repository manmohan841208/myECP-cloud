'use client';

import React from 'react';
import Card from './index';

const CardExample = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Card</h3>
        <Card className="p-4">
          <p>This is a basic card with just content.</p>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Card with Header</h3>
        <Card header="Card Title" className="p-4">
          <p>This is a card with a header and content.</p>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Card with Custom Styling</h3>
        <Card 
          header="Custom Card" 
          className="p-4 border-2 border-blue-500"
          headerClassName="bg-blue-600"
        >
          <p>This is a card with custom styling applied.</p>
        </Card>
      </div>
    </div>
  );
};

export default CardExample;