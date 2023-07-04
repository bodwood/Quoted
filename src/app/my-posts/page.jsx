'use client'
import React, { useState, useEffect } from 'react';
import QuoteCard from '@/components/QuoteCard';
import { useAuthContext } from '@/context/AuthContext';
import { getAllQuotesCurrentUser } from '@/firebase/firestore/getData';

const MyPosts = () => {
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
      <h1 className='text-4xl font-bold text-center mb-5'>Your Quotes</h1>
      <hr className='my-5' />

      {quotes.length === 0 ? (
        <p className='text-center'>You have not posted any quotes yet.</p>
      ) : (
        <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {quotes.map((quote) => (
            <div key={quote.quote.id}>
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
      )}
    </div>
  );
};

export default MyPosts;
