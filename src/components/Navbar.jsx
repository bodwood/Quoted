'use client'
import { useState } from 'react';
import Link from 'next/link';
import userSignOut from '@/firebase/auth/signout';
import 'firebase/auth';
import { useAuthContext } from '@/context/AuthContext';


function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const {user} = useAuthContext();

  const handleSignOut = async () => {
    try {
      await userSignOut();
      setLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
    console.log('successful signout')
  };

  return (
    <nav
      className={
        (props.transparent ? 'top-0 absolute z-50 w-full' : 'relative bg-white shadow-lg') +
        ' flex flex-wrap items-center justify-between px-2 py-3'
      }
    >
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-between relative z-50'>
        <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <Link href='/' passHref legacyBehavior>
            <span
              className={
                (props.transparent ? 'text-white' : 'text-gray-800') +
                ' title-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase'
              }
            >
              Quoted
            </span>
          </Link>
          <button
            className='text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className={(props.transparent ? 'text-white' : 'text-gray-800') + ' fas fa-bars'}></i>
          </button>
        </div>

        <div
          className={
            'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
            (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
          }
          id='example-navbar-warning'
        >
          <ul className='flex flex-col lg:flex-row list-none mr-auto'>
            <li className='flex items-center cursor-pointer'>
              <Link href='/' passHref legacyBehavior>
                <span
                  className={
                    (props.transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  <i
                    className={
                      (props.transparent ? 'lg:text-gray-300 text-gray-500' : 'text-gray-500') +
                      ' far fa-file-alt text-lg leading-lg mr-2'
                    }
                  ></i>
                  Home
                </span>
              </Link>
            </li>
            <li className='flex items-center cursor-pointer'>
              <Link href='/all-quotes' passHref legacyBehavior>
                <span
                  className={
                    (props.transparent
                      ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                      : 'text-gray-800 hover:text-gray-600') +
                    ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                  }
                >
                  <i
                    className={
                      (props.transparent ? 'lg:text-gray-300 text-gray-500' : 'text-gray-500') +
                      ' far fa-file-alt text-lg leading-lg mr-2'
                    }
                  ></i>
                  Feed
                </span>
              </Link>
            </li>
          </ul>
          {user ? (
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='flex items-center cursor-pointer'>
                <Link href='/my-posts' passHref legacyBehavior>
                  <span
                    className={
                      (props.transparent
                        ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                        : 'text-gray-800 hover:text-gray-600') +
                      ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                    }
                  >
                    <i
                      className={
                        (props.transparent ? 'lg:text-gray-300 text-gray-500' : 'text-gray-500') +
                        ' far fa-file-alt text-lg leading-lg mr-2'
                      }
                    ></i>
                    My Posts
                  </span>
                </Link>
              </li>

              <li className='flex items-center cursor-pointer'>
                <Link href='/user-profile' passHref legacyBehavior>
                  <span
                    className={
                      (props.transparent
                        ? 'lg:text-white lg:hover:text-gray-300 text-gray-800'
                        : 'text-gray-800 hover:text-gray-600') +
                      ' px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
                    }
                  >
                    <i
                      className={
                        (props.transparent ? 'lg:text-gray-300 text-gray-500' : 'text-gray-500') +
                        ' far fa-file-alt text-lg leading-lg mr-2'
                      }
                    ></i>
                    Profile
                  </span>
                </Link>
              </li>
              <li className='flex items-center'>
                <Link
                  href='/add-quote'
                  onClick={handleSignOut}
                  passHref
                  className={
                    (props.transparent
                      ? 'bg-white text-gray-800 active:bg-gray-100'
                      : 'bg-blue-500 text-white active:bg-blue-600') +
                    ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-3 transition-all duration-150 ease-in-out'
                  }
                  type='button'
                >
                  <i className='fas fa-arrow-alt-circle-down'></i>New Post
                </Link>
              </li>
              <li className='flex items-center'>
                <Link
                  href='/'
                  onClick={handleSignOut}
                  passHref
                  className={
                    (props.transparent
                      ? 'bg-white text-gray-800 active:bg-gray-100'
                      : 'bg-blue-500 text-white active:bg-blue-600') +
                    ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-3 transition-all duration-150 ease-in-out'
                  }
                  type='button'
                >
                  <i className='fas fa-arrow-alt-circle-down'></i>Log Out
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='flex items-center'>
                <Link
                  href='/signin'
                  passHref
                  className={
                    (props.transparent
                      ? 'bg-white text-gray-800 active:bg-gray-100'
                      : 'bg-blue-500 text-white active:bg-blue-600') +
                    ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-3 transition-all duration-150 ease-in-out'
                  }
                  type='button'
                >
                  <i className='fas fa-arrow-alt-circle-down'></i>Log In
                </Link>
              </li>
              <li className='flex items-center'>
                <Link
                  href='/signup'
                  passHref
                  className={
                    (props.transparent
                      ? 'bg-white text-gray-800 active:bg-gray-100'
                      : 'bg-blue-500 text-white active:bg-blue-600') +
                    ' text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ml-3 transition-all duration-150 ease-in-out'
                  }
                  type='button'
                >
                  <i className='fas fa-arrow-alt-circle-down'></i>Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
