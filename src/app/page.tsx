import ProtectedRoute from '@/templates/protectedroutes';
import React from 'react';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <main className="flex gap-8 px-4 py-3 md:px-16">Home Page</main>
    </ProtectedRoute>
  );
}
