'use client';

import React from 'react';
import AlertMessage from '@/components/atoms/AlertMessage';

const AlertMessageExample = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Success Alert</h3>
        <AlertMessage
          type="success"
          title="Success!"
          className='bg-[var(--success-background)] text-white'
          description="Operation completed successfully!"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Error Alert</h3>
        <AlertMessage
          type="error"
          title="Error!"
          description="An error occurred while processing your request."
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Info Alert</h3>
        <AlertMessage
          type="info"
          title="Information"
          description="Here's some helpful information."
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Alert without Title</h3>
        <AlertMessage
          type="info"
          description="This is an alert message without a title."
        />
      </div>
    </div>
  );
};

export default AlertMessageExample;