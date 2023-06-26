const Login = () => {
  return (
    <div className='container mx-auto max-w-lg py-12 md:py-24 px-0 md:px-8 min-h-[4xl]'>
      <div className='space-y-8'>
        <div className='space-y-6'>
          <div className='space-y-2 md:space-y-3 text-center'>
            <h1 className=''>Log in to your account</h1> {/* heading classname */}
            <div className='flex justify-center'>
              <p className='text-muted'>Don't have an account ?</p>
              <a href='/registration' className='ml-1 text-orange-500'>
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className='py-0 md:py-8 px-4 md:px-10 bg-[boxBR] md:shadow-xl'>
          <form className='space-y-6'>
            {' '}
            {/* onsubmit */}
            {/* {error && ( create error*/}
              <div className='flex flex-col items-center justify-center text-center'>
                <svg
                  className='w-6 h-6 text-red-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                </svg>
                <h2 className='text-red-500'>Oops!</h2>
                {/* <p className='text-red-500'>{error}</p>  Error still needs to be created*/}
              </div>
            {/* )}  keep the closing brackets*/ }
            <div className='space-y-5'>
              <div>
                <input
                  type='text'
                  name='email'
                  placeholder='janedoe@email.com'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='***'
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
              </div>
            </div>
            <div className='space-y-6'>
              <button
                className='bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium w-full'
                // disabled={loading} loading needs to be created
                type='submit'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login