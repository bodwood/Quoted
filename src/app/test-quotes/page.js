'use client'
import TestCard from '@/components/TestCard';
import { getAllQuoteInfo } from '@/firebase/firestore/getData';
import React from 'react';
import { useState, useEffect } from 'react';

const BlogTags = ({ tags, marginTop }) => {
  return (
    <div className={`flex space-x-2 ${marginTop && `mt-${marginTop}`}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className='inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-orange-500 rounded-full'
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

const ArticleList = () => {
const [quotes, setQuotes] = useState([]);

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
  return (
    <div className='container mx-auto p-12'>
      <h1 className='text-4xl font-bold justify-center'>Feed</h1>
      <h2 className='text-3xl font-bold mt-5'>Latest articles</h2>
      <hr className='mt-5' />

      {quotes.map((quote, index) => (
        <div key={index} className='mt-5 flex flex-wrap'>
          <TestCard
            firstName={quote.data.firstName}
            lastName={quote.data.lastName}
            quote={quote.quote.quote}
            profilePic={quote.profilePic}
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
