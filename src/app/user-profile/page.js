'use client'
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { updateDocument, getDocument } from '@/firebase/firestore/getData';
import addData from '@/firebase/firestore/addData';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Home() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePic: '',
  });
  const [image, setImage] = useState(null);
  const userId = useAuthContext().user.uid;
  const currentUser = useAuthContext().user;
  const currentProfilePic = useAuthContext().user.profilePic;
  const profilePicInputRef = useRef();
  const storage = getStorage(); // Get the storage instance

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
            profilePic: userData.profilePic || '',
          });
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
    if(e.target.files[0])
    {
      setImage(e.target.files[0]);;
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
    <div className='min-h-screen mx-auto px-4 py-6 lg:py-8 bg-white'>
      <div className='max-w-3xl lg:max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex-1.5 md:flex-2xl md:flex-none'>
            <h2 className='text-2xl font-extrabold'>Profile</h2>
            <div className='space-y-6'>
              <form onSubmit={handleForm} className='space-y-5'>
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
                  <button className='btn btn-orange btn-lg w-full text-black' type='submit'>
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className='space-y-6'>
                <div className='space-y-5'>
                  <div>
                    <label className='block mb-1'>Profile Pic</label>
                    <input type='file' ref={profilePicInputRef} onChange={handleProfilePicUpload} className='' />
                    <button className='btn btn-orange btn-lg w-full text-black' onClick={handleProfilePicSubmit}>
                      Upload Profile Picture
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <div>
            <img src={user.profilePic} alt='Profile Pic' className='w-40 h-40 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}
