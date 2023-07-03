import Link from 'next/link';
import { FaArrowRight, FaHelicopter, FaCommentDots } from 'react-icons/fa';

const LandingScreen = () => (
  <div className='max-w-7xl mx-auto'>
    <div className='flex flex-col-reverse md:flex-row items-center md:space-x-10 py-20 md:py-28'>
      <div className='flex-1 space-y-5 md:space-y-10'>
        <h1 className='text-3xl sm:text-4xl lg:text-6xl font-semibold leading-tight'>
          <span className='relative'>
            Quoted,
            <span className='absolute w-full h-3 bottom-1 left-0 bg-red-400 z-[-1]'></span>
          </span>
          <br />
          <span className='text-red-400'>quotes from everywhere!</span>
        </h1>
        <p className='text-gray-500'>
          Upload your favorite quotes from your favorite movies, books, and more! Sign Up now to get started!
        </p>
        <div className='space-x-4 sm:space-x-6 flex flex-col sm:flex-row'>
          <Link href='/signup' passHref>
            <button className='bg-red-400 hover:bg-red-500 text-white rounded-full py-3 px-6 font-normal text-lg'>
              Get started
            </button>
          </Link>
          <Link href='/all-quotes' passHref>
            <button className='bg-transparent hover:bg-transparent text-white rounded-full py-3 px-6 font-normal text-lg flex items-center'>
              <FaCommentDots className='w-4 h-4 mr-2 text-gray-300' />
              View Feed
            </button>
          </Link>
        </div>
        <div>
          <p className='text-gray-500'>
            Already have an account? <Link href='/signin' passHref><span className='text-red-400'>Login</span></Link>
          </p>
        </div>
      </div>
      <div className='flex-1 relative'>
        <div className='absolute top-[-20%] left-0 w-150% h-150% z-[-1] bg-red-50 dark:bg-red-400'></div>
        <div className='relative h-300 rounded-2xl shadow-2xl overflow-hidden'>
          <img
            src='https://i.pinimg.com/originals/0e/51/60/0e5160eac9f802adbf320e9d42c26884.png'
            alt='quote ted'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  </div>
);

export default LandingScreen;