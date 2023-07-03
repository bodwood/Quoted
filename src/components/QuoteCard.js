export default function QuoteCard({ quote, firstName, lastName, profilePic }) {
  return (
    <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/3'>
      <div className='w-full flex items-start'>
        <div className='overflow-hidden rounded-lg'>
          <a href='#' className='block'>
            <img
              src={profilePic}
              alt='some text'
              className='w-full transform transition duration-300 scale-100 hover:scale-105'
            />
          </a>
        </div>
        <div className='ml-4 flex flex-col justify-center'>
          <div>
            <h3 className='text-3xl font-bold mt-2'>
              <a href='#' className='text-blue-600 hover:underline'>
                Quote
              </a>
            </h3>
            <p className='text-3cl mt-2 text-white'>{quote}</p>
          </div>
          <div className='flex items-center mt-2 space-x-2'>
            <img
              src='https://100k-faces.glitch.me/random-image'
              alt={`Avatar of ${firstName} ${lastName}`}
              className='w-10 h-10 rounded-full'
            />
            <span className='font-medium'>{firstName}</span>
            <span className='text-gray-500'>—</span>
          </div>
        </div>
      </div>
    </div>
  );
}
