'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext';

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <Navbar />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
