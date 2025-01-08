import React from 'react' // Import React for component functionality
import { useGlobalContext } from '../provider/GlobalProvider' // Import global context to access total price and total quantity
import { FaCartShopping } from 'react-icons/fa6' // Import cart shopping icon
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees' // Import utility function to display price in rupees
import { Link } from 'react-router-dom' // Import Link component from React Router for navigation
import { FaCaretRight } from "react-icons/fa" // Import right arrow icon for cart link
import { useSelector } from 'react-redux' // Import useSelector hook from Redux to access cart state

const CartMobileLink = () => { // CartMobileLink component that displays cart summary in mobile view
    const { totalPrice, totalQty } = useGlobalContext() // Destructure total price and total quantity from global context
    const cartItem = useSelector(state => state.cartItem.cart) // Access cart items from Redux store

  return (
    <>
        {
            cartItem[0] && ( // Check if there are items in the cart, if yes, display the cart link
            <div className='sticky bottom-4 p-2'>
                {/* Sticky bottom container with padding */}
                
                <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden'>
                    {/* Cart summary box with background, padding, rounded corners, and flexbox layout for mobile view */}
                    
                    <div className='flex items-center gap-2'>
                        {/* Flex container for cart icon and summary */}
                        
                        <div className='p-2 bg-green-500 rounded w-fit'>
                            <FaCartShopping/> 
                            {/* Cart icon inside a rounded box with green background */}
                        </div>
                        
                        <div className='text-xs'>
                                <p>{totalQty} items</p> 
                                {/* Display total quantity of items in the cart */}
                                
                                <p>{DisplayPriceInRupees(totalPrice)}</p> 
                                {/* Display total price of items in the cart formatted in rupees */}
                        </div>
                    </div>

                    <Link to={"/cart"} className='flex items-center gap-1'>
                        {/* Link to the cart page with flexbox layout */}
                        
                        <span className='text-sm'>View Cart</span> 
                        {/* Text showing "View Cart" */}
                        
                        <FaCaretRight/> 
                        {/* Right arrow icon indicating navigation */}
                    </Link>
                </div>
            </div>
            )
        }
    </>
    
  )
}

export default CartMobileLink // Export CartMobileLink component for use in other parts of the app
