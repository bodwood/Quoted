'use client'
import Link from 'next/link';

export default function QuoteCard({ quote }) {
  return (
    <div className='p-2 space-y-3px bg-white dark:bg-gray-800 min-w-240 h-500 border-0 rounded-lg shadow-md relative'>
      {/* <Link href='/'>
        <img className='products-images rounded-t-lg rounded-b-lg' src='placeholder-image.jpg' alt='Placeholder' />
      </Link> */}
      <div className='flex justify-between'>
        <div className='text-2xl text-gray-800 bg-white text-black'>{quote}</div>
      </div>
    </div>
  );
}

