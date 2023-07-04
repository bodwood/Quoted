'use client';
import QuoteCard from '@/components/QuoteCard';
import { useAuthContext } from '@/context/AuthContext';
import { getAllQuoteInfo } from '@/firebase/firestore/getData';
import React from 'react';
import { useState, useEffect } from 'react';

const AllQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const { user } = useAuthContext() || '';

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quoteInfo = await getAllQuoteInfo();
        setQuotes(quoteInfo);
      } catch (error) {
        console.error('Error fetching quotes: ', error);
      }
    };
    fetchQuotes();
  }, []);

  const updateQuote = (quoteId, updatedQuote) => {
    setQuotes((prevQuotes) => {
      const updatedQuotes = prevQuotes.map((quote) => {
        if (quote.quoteId === quoteId) {
          return { ...quote, quote: updatedQuote };
        }
        return quote;
      });
      return updatedQuotes;
    });
  };
  
  return (
    <div className='container mx-auto p-12'>
      <h1 className='text-4xl font-bold justify-center'>Feed</h1>
      <h2 className='text-3xl font-bold mt-5'>Latest articles</h2>
      <hr className='mt-5' />

      {quotes.map((quote, index) => (
        <div key={index} className='mt-5 flex flex-wrap'>
          <QuoteCard
            firstName={quote.data.firstName}
            lastName={quote.data.lastName}
            quote={quote.quote.quote}
            profilePic={quote.profilePic}
            quoteId={quote.quote.id}
            updateQuote={updateQuote}
          />
        </div>
      ))}
    </div>
  );
};

export default AllQuotes;
