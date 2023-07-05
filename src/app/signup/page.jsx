'use client';
import { useState } from 'react';
import signUp from '@/firebase/auth/signup';
import { useRouter } from 'next/navigation';
import addData from '@/firebase/firestore/addData';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  //Runs signUp function from firebase/auth/signup.js
  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await signUp(email, password);
    if (result) {
      const userId = result.user.uid;
      const myBlob  = await fetch('/images/placeholder_pic.png').then((r) => r.blob());
      const myFile = new File([myBlob], 'placeholder_pic.png', { type: 'image/png' });
      await addData('users', userId, { data }, myFile);
    }
    return router.push('/add-quote');
  };

  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'>
            <h1 className=''>Sign Up</h1> {/* heading classname */}
            <div className='flex justify-center'>
              <p className='text-muted'>Already have an account?</p>
              <a href='/signin' className='ml-1 text-orange-500'>
                Sign In
              </a>
            </div>
          </div>
        </div>
        <div className='py-0 md:py-8 px-4 md:px-10 bg-[boxBR] md:shadow-xl text-black'>
          <form className='space-y-6' onSubmit={handleForm}>
            <div className='space-y-5'>
              <div>
                <div>
                  <input
                    type='text'
                    name='first-name'
                    placeholder='Jane'
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='last-name'
                    placeholder='Doe'
                    className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='janedoe@email.com'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='********'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='space-y-6'>
              <button
                className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                // disabled={loading} loading needs to be created
                type='submit'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
