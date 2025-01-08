import React from 'react' // Import React for component functionality

const CardLoading = () => { // CardLoading component to show a loading skeleton for a card
  return (
    <div className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white animate-pulse'>
      {/* Card container with border, padding, and grid layout; applies pulse animation to simulate loading */}
      
      <div className='min-h-24 bg-blue-50 rounded'>
        {/* Placeholder for image or media content with minimum height, light blue background, and rounded corners */}
      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
        {/* Placeholder for title or header section with padding, light blue background, and rounded corners */}
      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded'>
        {/* Placeholder for content or description with padding, light blue background, and rounded corners */}
      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'>
        {/* Placeholder for additional content, smaller width with padding, light blue background, and rounded corners */}
      </div>

      <div className='flex items-center justify-between gap-3'>
        {/* Flex container for footer section with items aligned and space between */}
        
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
          {/* Placeholder for footer element with padding, light blue background, and rounded corners */}
        </div>

        <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>
          {/* Placeholder for footer element with padding, light blue background, and rounded corners */}
        </div>
      </div>

    </div>
  )
}

export default CardLoading // Export CardLoading component for use in other parts of the app
