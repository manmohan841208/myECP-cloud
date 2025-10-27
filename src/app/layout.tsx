import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthProvider';

export const metadata: Metadata = {
  title: 'MILITARY STAR',
  description: 'Created by AAFES web team',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#D3D3D3] text-[14px] antialiased font-arial">
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}