'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthContext } from '@/context/AuthContext';
import { updateDocument, getDocument } from '@/firebase/firestore/getData';

export default function Home() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const userId = useAuthContext().user.uid;
  const currentUser = useAuthContext().user;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocument = await getDocument('users', userId);
          const userData = userDocument.result.data();
          setUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchUserData();
  }, [currentUser]);

  // This function is called when the form is submitted and adds the quote to firestore.
  const handleForm = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { result, error } = await updateDocument('users', userId, updatedUser);

    if (result) {
      console.log('Result: ' + result);
    } else {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='min-h-screen mx-auto px-4 py-6 lg:py-8'>
      <div className='max-w-3xl lg:max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex-1.5 md:flex-2xl md:flex-none'>
            <h2 className='text-2xl font-extrabold'>Profile</h2>
            <div className='space-y-6'>
              <form onSubmit={handleForm} className='space-y-5'>
                <div className='space-y-5'>
                  <div>
                    <label className='block'>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First Name'
                      className='w-full text-black'
                      value={user.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className='block'>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last Name'
                      className='w-full text-black'
                      value={user.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className='block'>Email</label>
                    <input
                      type='text'
                      name='email'
                      placeholder='Email'
                      className='w-full text-black'
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className='space-y-6'>
                  <button className='btn btn-orange btn-lg' type='submit'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
