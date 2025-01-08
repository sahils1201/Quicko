import React from 'react' // Import React for component functionality
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees' // Import utility function for displaying price in rupees
import { Link } from 'react-router-dom' // Import Link component from React Router for navigation
import { valideURLConvert } from '../utils/valideURLConvert' // Import utility function to validate and convert URL
import { pricewithDiscount } from '../utils/PriceWithDiscount' // Import utility function to calculate price with discount
import SummaryApi from '../common/SummaryApi' // Import API configurations (not used directly in this component)
import AxiosToastError from '../utils/AxiosToastError' // Import custom Axios error handling (not used directly in this component)
import Axios from '../utils/Axios' // Import Axios for HTTP requests (not used directly in this component)
import toast from 'react-hot-toast' // Import toast for showing notifications
import { useState } from 'react' // Import useState hook to manage state in the component
import { useGlobalContext } from '../provider/GlobalProvider' // Import global context for accessing shared states and functions
import AddToCartButton from './AddToCartButton' // Import AddToCartButton component to add products to cart

const CardProduct = ({ data }) => { // CardProduct component accepts 'data' prop which contains product details
    const url = `/product/${valideURLConvert(data.name)}-${data._id}` // Construct URL for product details page using name and product ID
    const [loading, setLoading] = useState(false) // State for managing loading state (though not used directly in this component)

  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'>
      {/* Link component for navigating to product detail page; styled as a grid item with border and padding */}
      
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            {/* Placeholder for product image with min height and responsive scaling */}
            <img 
                src={data.image[0]} // Set product image from 'data.image'
                className='w-full h-full object-scale-down lg:scale-125' // Responsive image scaling
            />
      </div>
      
      <div className='flex items-center gap-1'>
        <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
              10 min 
        </div>
        <div>
            {
              Boolean(data.discount) && ( // Check if there is a discount and display it
                <p className='text-white bg-blue-400 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
              )
            }
        </div>
      </div>
      
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name} 
        {/* Display the product name with text ellipsis for overflow */}
      </div>
      
      <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit} 
        {/* Display the unit of the product */}
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold'>
              {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))} 
              {/* Display price with discount formatted in rupees */}
          </div>
        </div>
        
        <div className=''>
          {
            data.stock == 0 ? ( // Check if the product is out of stock
              <p className='text-red-500 text-sm text-center'>Out of stock</p> // Display out of stock message
            ) : (
              <AddToCartButton data={data} /> // Display AddToCartButton if the item is in stock
            )
          }
        </div>
      </div>

    </Link>
  )
}

export default CardProduct // Export CardProduct component for use in other parts of the app
