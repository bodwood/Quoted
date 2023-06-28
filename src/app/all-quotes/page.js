'use client';
import { useState, useEffect } from 'react';
import { getAllQuotes } from '@/firebase/firestore/getData';

export default function Home() {
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

  const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Date) {
      return timestamp.toString();
    } else if (timestamp?.toDate instanceof Function) {
      const date = timestamp.toDate();
      return date.toString();
    } else {
      return '';
    }
  };

  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'></div>
        </div>
        <div className='py-0 md:py-8 px-4 md:px-10 bg-[boxBR] md:shadow-xl text-white'>
          <div>
            {quotes.map((quote, index) => (
              <div key={index}>
                <p>{quote.quote}</p>
                <p>{formatTimestamp(quote.timestamp)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
