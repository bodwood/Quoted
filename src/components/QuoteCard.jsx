'use client'
import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { getDocument, updateDocument } from '@/firebase/firestore/getData';

const QuoteCard = ({ quoteId, quote, firstName, lastName, profilePic, updateQuote }) => {
  let userId = '';
  const { user } = useAuthContext();
  if(user) userId = user.uid;

  const [editMode, setEditMode] = useState(false);
  const [editedQuote, setEditedQuote] = useState(quote);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    // Handle delete functionality
  };

const handleForm = async (e) => {
  e.preventDefault();

  const userDocument = await getDocument('users', userId);

  if (userDocument.result) {
    const userData = userDocument.result.data();
    const existingQuotes = userData.quotes || [];

    const quoteIndex = existingQuotes.findIndex((q) => q.id === quoteId);

    if (quoteIndex !== -1) {
      existingQuotes[quoteIndex].quote = editedQuote;

      const { result, error } = await updateDocument('users', userId, {
        quotes: existingQuotes,
      });

      if (result) {
        console.log(result);
        setEditMode(false);
        setEditedQuote(editedQuote); // Update the local state with the edited quote
        updateQuote(quoteId, editedQuote);
      } else {
        console.log(error);
      }
    }
  } else {
    console.log(userDocument.error);
  }
};

  return (
    <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3'>
      <div className='w-full flex items-start'>
        <div className='overflow-hidden rounded-lg'>
          <a href='#' className='block'>
            <img
              src={profilePic}
              alt='some text'
              className='w-full transform transition duration-300 scale-100 hover:scale-105'
            />
          </a>
        </div>
        <div className='ml-4 flex flex-col justify-center'>
          <div>
            <h3 className='text-3xl font-bold mt-2'>
              <a href='#' className='text-blue-600 hover:underline'>
                Quote
              </a>
            </h3>
            {editMode ? (
              <textarea
                value={editedQuote}
                onChange={(e) => setEditedQuote(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black'
              />
            ) : (
              <p className='text-3cl mt-2 text-white'>{editedQuote}</p>
            )}
          </div>
          <div className='flex items-center mt-2 space-x-2'>
            <img
              src='https://100k-faces.glitch.me/random-image'
              alt={`Avatar of ${firstName} ${lastName}`}
              className='w-10 h-10 rounded-full'
            />
            <span className='font-medium'>{firstName}</span>
            <span className='text-gray-500'>—</span>
          </div>
          {userId === quoteId && (
            <div className='mt-2'>
              {editMode ? (
                <button className='bg-blue-500 text-white rounded-md px-4 py-2' onClick={handleForm}>
                  Save
                </button>
              ) : (
                <button className='bg-blue-500 text-white rounded-md px-4 py-2' onClick={handleEdit}>
                  Edit
                </button>
              )}
              <button className='bg-red-500 text-white rounded-md px-4 py-2 ml-2' onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
