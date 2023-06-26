import React from 'react';
import Link from 'next/link';

const QuoteCard = ({ name, quote, id }) => {
  const handleDelete = async () => {};

  return (
    <div className='text-capitalize cursor-pointer mt-8' style={{ alignItems: 'start' }}>
      <Link href={`/quote/${id}`}>
        <h2 className='text-2xl cursor-pointer'>{name}</h2>
      </Link>

      <h2 className='text-2xl'>Quote: {quote}</h2>

      <button className='px-4 py-2 mt-4 bg-red-500 text-white rounded-md' onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default QuoteCard;
