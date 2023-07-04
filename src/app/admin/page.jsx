'use client';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page is only accessible to logged in users
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  
  // If the user is not logged in, redirect to the home page
  useEffect(() => {
    if (user == null) router.push('/');
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}

export default Page;
