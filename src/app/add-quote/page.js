'use client';
import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { updateDocument } from '@/firebase/firestore/getData';
import { getDocument } from '@/firebase/firestore/getData';

// Adds quote data to firestore by using the addData function in src/firebase/firestore/addData.js
export default function Home() {
  const [quote, setQuote] = useState('');
  const userId = useAuthContext().user.uid;
  const email = useAuthContext().user.email;
  const quotes = useAuthContext().user.quotes;
  const timestamp = useAuthContext().user.timestamp;

  const data = {
    quote: quote,
    timestamp: new Date(),
  }

  // This function is called when the form is submitted and adds the quote to firestore.
  const handleForm = async (e) => {
    e.preventDefault();

    const userDocument = await getDocument('users', userId);

    if (userDocument.result) {
      const userData = userDocument.result.data();
      const existingQuotes = userData.quotes || [];

      // Add the new quote to the existing quotes
      existingQuotes.push(data);

      // Update the user document with the new quotes
      const { result, error } = await updateDocument('users', userId, {
        quotes: existingQuotes,
      });

      if (result) {
        console.log(result);
      } else {
        console.log(error);
      }
    } else {
      console.log(userDocument.error);
    }
  };
  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'>
            <h1 className=''>Add Quote</h1> {/* heading classname */}
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
                  onChange={(e) => setQuote(e.target.value)}
                />
              </div>
            </div>
            <div className='space-y-6'>
              <button
                className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                // disabled={loading} loading needs to be created
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
