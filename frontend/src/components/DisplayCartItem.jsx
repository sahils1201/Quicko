import React from 'react' // Import React to use JSX
import { IoClose } from 'react-icons/io5' // Import the close icon
import { Link, useNavigate } from 'react-router-dom' // Import Link for navigation and useNavigate for redirecting
import { useGlobalContext } from '../provider/GlobalProvider' // Import global context to access cart and price data
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees' // Utility function to display price in INR
import { FaCaretRight } from "react-icons/fa"; // Import caret icon for "Proceed" button
import { useSelector } from 'react-redux' // To fetch the cart items and user data from the Redux store
import AddToCartButton from './AddToCartButton' // Button component to add more items to cart
import { pricewithDiscount } from '../utils/PriceWithDiscount' // Function to calculate price after discount
import cart from '../assets/cart.png' // Placeholder image when the cart is empty
import toast from 'react-hot-toast' // Toast notifications

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext() // Access cart-related data from global context
    const cartItem = useSelector(state => state.cartItem.cart) // Get cart items from Redux store
    const user = useSelector(state => state.user) // Get user data from Redux store
    const navigate = useNavigate() // Hook to navigate to different pages

    // Function to redirect to checkout page if the user is logged in, otherwise show login toast
    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout") // Redirect to checkout page
            if (close) {
                close() // Close the cart overlay if a close function is passed
            }
            return
        }
        toast("Please Login") // Show login prompt if user is not logged in
    }

    return (
        // Full screen overlay for the cart display
        <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                {/* Cart header with close button */}
                <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} /> {/* Close icon for small screens */}
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} /> {/* Close icon for larger screens */}
                    </button>
                </div>

                {/* Cart items and total details */}
                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {
                        cartItem[0] ? (
                            <>
                                {/* Savings display */}
                                <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>

                                {/* Cart items grid */}
                                <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {cartItem.map((item, index) => (
                                        <div key={item?._id + "cartItemDisplay"} className='flex w-full gap-4'>
                                            {/* Product image */}
                                            <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                <img src={item?.productId?.image[0]} className='object-scale-down' />
                                            </div>
                                            {/* Product details */}
                                            <div className='w-full max-w-sm text-xs'>
                                                <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                            </div>
                                            {/* Add to Cart button */}
                                            <div>
                                                <AddToCartButton data={item?.productId} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bill details */}
                                <div className='bg-white p-4'>
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Items total</p>
                                        <p className='flex items-center gap-2'>
                                            <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                            <span>{DisplayPriceInRupees(totalPrice)}</span>
                                        </p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Quantity total</p>
                                        <p className='flex items-center gap-2'>{totalQty} item</p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Delivery Charge</p>
                                        <p className='flex items-center gap-2'>Free</p>
                                    </div>
                                    <div className='font-semibold flex items-center justify-between gap-4'>
                                        <p>Grand total</p>
                                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Show placeholder when cart is empty
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img src={cart} className='w-full h-full object-scale-down' />
                                <Link onClick={close} to={"/"} className='block bg-green-600 px-4 py-2 text-white rounded'>Shop Now</Link>
                            </div>
                        )
                    }
                </div>

                {/* Proceed button */}
                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                                <div>
                                    {DisplayPriceInRupees(totalPrice)}
                                </div>
                                <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                    Proceed
                                    <span><FaCaretRight /></span> {/* Proceed icon */}
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default DisplayCartItem
