'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import './globals.css';
import { AuthContext, AuthContextProvider } from '@/context/AuthContext';

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head />

      <body>
        <AuthContextProvider>
          <Navbar />
          <div style={{ marginTop: '72px' }}>{/* Add margin-top to create space for the navbar */}</div>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
