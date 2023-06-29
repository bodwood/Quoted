import Link from 'next/link';
import { FaArrowRight, FaHelicopter } from 'react-icons/fa';

const LandingScreen = () => (
  <div className='max-w-7xl mx-auto px-0 lg:px-12 py-0 lg:py-12 min-h-screen'>
    <div className='flex flex-col-reverse lg:flex-row space-y-0 lg:space-y-0 lg:space-x-20 mt-10'>
      <div className='w-full sm:w-sm transform translate-y-[-50%] bg-orange-50 lg:bg-transparent mx-6 md:mx-8 lg:mx-0 px-6 md:px-8 lg:px-0 py-6 md:py-8 lg:py-4'>
        <div className='space-y-10'>
          <div className='space-y-4 ml-4%'>
            <div className='flex items-center'></div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-[#9C4F96] via-[#FF6355] to-[#2AA8F2] bg-clip-text'>
              Quoted
            </h1>
            <h2 className='text-2xl font-semibold'>Quotes from the heart</h2>
          </div>
          <div className='flex space-x-3'>
            <Link href='/all-quotes' className='font-bold text-lg ml-4%'>
              Discover now
            </Link>
            <FaArrowRight className='w-4 h-4' />
          </div>
        </div>
      </div>
      <div className='flex overflow-hidden justify-center'>
        <div className='flex'>
          <img
            src='https://decider.com/wp-content/uploads/2020/10/alexis-schitts-sketchy.jpg?quality=90&strip=all&w=618'
            alt='quote Alexis'
            className='object-cover w-1/2'
          />
          <img
            src='https://i.pinimg.com/originals/0e/51/60/0e5160eac9f802adbf320e9d42c26884.png'
            alt='quote ted'
            className='hidden sm:inline object-cover w-1/2'
          />
        </div>
      </div>
    </div>

    <h2 className='mt-5 mb-1 text-2xl font-semibold ml-1%'>Our Favorites</h2>
  </div>
);

export default LandingScreen;
