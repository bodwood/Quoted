'use client';
import QuoteCard from '@/components/QuoteCard';
import { useAuthContext } from '@/context/AuthContext';
import { getAllQuotesCurrentUser } from '@/firebase/firestore/getData';
import React, { useState, useEffect } from 'react';

const AllQuotes = () => {
  const { user: currentUser } = useAuthContext();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        if (currentUser) {
          const quoteInfo = await getAllQuotesCurrentUser(currentUser.uid);
          setQuotes(quoteInfo);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    fetchQuotes();
  }, [currentUser]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl font-bold justify-center'>Your Quotes</h1>
      <hr className='mt-5' />

      {quotes.map((quote, index) => (
        <div key={index} className='mt-5 flex flex-wrap'>
          <QuoteCard
            firstName={quote.data.firstName}
            lastName={quote.data.lastName}
            quote={quote.quote.quote}
            profilePic={quote.profilePic}
            quoteId={quote.quote.id}
          />
        </div>
      ))}
    </div>
  );
};

export default AllQuotes;