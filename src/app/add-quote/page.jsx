'use client';
import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { updateDocument } from '@/firebase/firestore/getData';
import { getDocument } from '@/firebase/firestore/getData';
import { useRouter } from 'next/navigation';

export default function AddQuote() {
  const [quote, setQuote] = useState('');
  const userId = useAuthContext().user.uid;
  const router = useRouter();

  console.log('userId', userId);

  const data = {
    quote: quote,
    timestamp: new Date(),
    id: userId,
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const userDocument = await getDocument('users', userId);

    if (userDocument.result) {
      const userData = userDocument.result.data();
      const existingQuotes = userData.quotes || [];

      existingQuotes.push(data);

      const { result, error } = await updateDocument('users', userId, {
        quotes: existingQuotes,
      });

      if (error) {
        console.log(error);
      } else {
        router.push('/all-quotes');
      }
    } else {
      console.log(userDocument.error);
    }
  };

  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center text-3xl'>
            <h1 className=''>Add Quote</h1>
          </div>
        </div>
        <div className='py-0 md:py-8 px-4 md:px-10 bg-[boxBR] md:shadow-xl text-black'>
          <form className='space-y-6' onSubmit={handleForm}>
            <div className='space-y-5'>
              <div>
                <input
                  type='text'
                  name='quote'
                  id='quote'
                  placeholder='Add quote here'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  onChange={(event) => setQuote(event.target.value)}
                />
              </div>
            </div>
            <div className='space-y-6'>
              <button
                className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                type='submit'
              >
                Submit Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
