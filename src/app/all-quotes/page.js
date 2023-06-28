'use client';
import { useState, useEffect } from 'react';
import { getAllQuotes } from '@/firebase/firestore/getData';
import QuoteCard from '@/components/QuoteCard';

export default function AllQuotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotes = await getAllQuotes();
        setQuotes(quotes);
      } catch (error) {
        console.error('Error fetching quotes: ', error);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div className='flex flex-wrap justify-center min-h-screen'>
      {quotes.map((quote, index) => (
        <div key={index} className='w-64 h-80 m-4'>
          <div className='flex items-center justify-center h-full bg-white rounded-md shadow-md p-4'>
            <QuoteCard quote={quote.quote} />
            {console.log(quote.quote)}
          </div>
        </div>
      ))}
    </div>
  );
}
