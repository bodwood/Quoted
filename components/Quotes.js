import React, { useEffect, useState } from 'react';

import QuoteCard from './QuoteCard';

const Quotes = () => {
  const [Quotes, setQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('component is mounted');
    })();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {Quotes.map((quote) => (
        <QuoteCard key={quote.id} {...quote} />
      ))}
    </div>
  );
};

export default QuoteCard;
