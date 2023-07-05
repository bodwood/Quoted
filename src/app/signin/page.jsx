'use client';
import { useState } from 'react';
import signIn from '@/firebase/auth/signin';
import { useRouter } from 'next/navigation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Used to sign in a user by using the signIn function in src/firebase/auth/signin.js
  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error);
    }
    //takes user to the home page
    return router.push('/add-quote');
  };
  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'>
            <h1 className=''>Sign In</h1> {/* heading classname */}
            <div className='flex justify-center'>
              <p className='text-muted'>Don&apos;t have an account?</p>
              <a href='/SignUpScreen' className='ml-1 text-orange-500'>
                Sign Up
              </a>
            </div>
          </div>
        </div>
        <div className='py-0 md:py-8 px-4 text-black md:px-10 bg-[boxBR] md:shadow-xl'>
          <form className='space-y-6' onSubmit={handleForm}>
            <div className='space-y-5'>
              <div>
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
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;
