'use client'
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { updateDocument, getDocument } from '@/firebase/firestore/getData';
import addData from '@/firebase/firestore/addData';

export default function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
  });
  const [image, setImage] = useState(null);
  const userId = useAuthContext().user.uid;
  const currentUser = useAuthContext().user;
  const profilePicInputRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocument = await getDocument('users', userId);
          const userData = userDocument.result.data();
          console.log(userData)
          setUser({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            profilePic: userData.profilePic || '',
          });
          console.log(user)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleForm = async (e) => {
    e.preventDefault();

    const updatedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      // profilePic: user.profilePic,
    };

    const { result, error } = await updateDocument('users', userId, updatedUser);

    if (result) {
      console.log('Result:', result);
    } else {
      console.log('Error:', error);
    }
  };

  const handleProfilePicUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      try {
        const { success, error } = await addData('users', userId, {}, image);
        if (success) {
          console.log('Profile picture added successfully');
        } else {
          console.log('Error adding profile picture:', error);
        }
      } catch (error) {
        console.log('Error uploading profile picture:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-white'>
      <div className='max-w-3xl w-full mx-4 py-6 lg:py-8'>
        <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0'>
          <div className='flex-1'>
            <h2 className='text-2xl font-extrabold'>Profile</h2>
            <form onSubmit={handleForm} className='space-y-5 mt-4'>
              <div className='space-y-5'>
                <div>
                  <label className='block mb-1'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    className='w-full text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                    value={user.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className='block mb-1'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    className='w-full text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                    value={user.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className='block mb-1'>Email</label>
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    className='w-full text-black rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300'
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className='space-y-6'>
                <button
                  className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                  type='submit'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className='flex-1'>
            <div className='space-y-5 mt-4'>
              <div className='flex justify-center'>
                <img src={user.profilePic} alt='Profile Pic' className='w-40 h-40 rounded-full' />
              </div>
              <div>
                <label className='block mb-1'>Profile Pic</label>
                <input type='file' ref={profilePicInputRef} onChange={handleProfilePicUpload} className='' />
                <button
                  className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                  onClick={handleProfilePicSubmit}
                >
                  Save Profile Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
