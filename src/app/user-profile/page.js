'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuthContext();
  console.log(user);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const firestore = getFirestore();
      const quotesRef = collection(firestore, 'users');
      console.log('quote ' + quotesRef)
      const userQuotesQuery = query(quotesRef, where('authorId', '==', user.uid));

      try {
        const snapshot = await getDocs(userQuotesQuery);
        const quotesData = snapshot.docs.map((doc) => doc.data());
        setQuotes(quotesData);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    if (user) {
      fetchQuotes();
    }
  }, [user]);

  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'>
            <h1 className='text-white'>Quotes from {user && user.displayName}</h1>
          </div>
        </div>
        <div className='py-0 md:py-8 px-4 md:px-10 bg-[boxBR] md:shadow-xl text-white'>
          <div>
            {quotes.map((quote, index) => (
              <div key={index}>{quote}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
