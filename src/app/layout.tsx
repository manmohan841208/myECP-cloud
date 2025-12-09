import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthProvider';
import GTMHead from '@/components/GtmHead';
import GA from '@/components/Ga';
import GTMNoScript from '@/components/GtmNoScript';
import AnalyticsProvider from '@/components/AnalyticsProvider';

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
      <head>
        {/* GTM loader in head */}
        <GTMHead />
        {/* Direct GA4 optional */}
        <GA />
      </head>
      <body className="bg-[#D3D3D3] text-[14px] antialiased font-arial min-h-screen flex flex-col">
        <AuthProvider>
          <Providers>
            <Navbar />
            {/* GTM noscript must be in body */}
            <GTMNoScript />
            {/* Tracks page views on route change */}
            <AnalyticsProvider />
            <main className="flex-grow">
              {children}
            </main>
            <div>
              <Footer />
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}