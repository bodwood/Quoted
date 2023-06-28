import Link from 'next/link';
import Image from 'next/image';

export default function QuoteCard({ quote }) {
  return (
    <div className='p-2 space-y-3px bg-white dark:bg-gray-800 min-w-240 h-500 border-0 rounded-lg shadow-md relative'>
      <Image
        className='rounded-t-lg rounded-b-lg'
        src='/assets/images/corgi.jpg' // Update the image path based on your project structure
        alt='Placeholder'
        width={100}
        height={100}
      />

      <div className='flex justify-between'>
        <div className='text-2xl text-gray-800 bg-white text-black'>{quote}</div>
      </div>
    </div>
  );
}
