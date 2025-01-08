import React, { useEffect, useState } from 'react' // Import React and hooks for component functionality
import { useGlobalContext } from '../provider/GlobalProvider' // Import custom global context for cart actions
import Axios from '../utils/Axios' // Import Axios for HTTP requests
import SummaryApi from '../common/SummaryApi' // Import API configuration for adding to cart
import toast from 'react-hot-toast' // Import toast for showing notifications
import AxiosToastError from '../utils/AxiosToastError' // Import custom error handler for Axios
import Loading from './Loading' // Import Loading component to show a loading spinner
import { useSelector } from 'react-redux' // Import useSelector for accessing Redux state
import { FaMinus, FaPlus } from "react-icons/fa6"; // Import icons for decrement and increment buttons

const AddToCartButton = ({ data }) => { // AddToCartButton component, accepts 'data' (product info) as prop
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext() // Destructure functions from global context for cart operations
    const [loading, setLoading] = useState(false) // State to manage loading state for adding to cart
    const cartItem = useSelector(state => state.cartItem.cart) // Access cart items from Redux state
    const [isAvailableCart, setIsAvailableCart] = useState(false) // State to track if the item is in the cart
    const [qty, setQty] = useState(0) // State to manage the quantity of the item in the cart
    const [cartItemDetails, setCartItemsDetails] = useState() // State to store cart item details

    const handleADDTocart = async (e) => { // Function to handle adding item to cart
        e.preventDefault() // Prevent default behavior of the event
        e.stopPropagation() // Stop event propagation

        try {
            setLoading(true) // Set loading to true while adding to cart

            const response = await Axios({
                ...SummaryApi.addTocart, // Use API configuration to add item to cart
                data: {
                    productId: data?._id // Send product ID to the API
                }
            })

            const { data: responseData } = response // Extract response data from the API response

            if (responseData.success) { // Check if the API request was successful
                toast.success(responseData.message) // Show success toast notification
                if (fetchCartItem) { // If fetchCartItem function exists
                    fetchCartItem() // Fetch updated cart items
                }
            }
        } catch (error) {
            AxiosToastError(error) // Handle any errors using custom error handler
        } finally {
            setLoading(false) // Set loading to false after the request completes
        }
    }

    // Effect to check if the item is in the cart and set its details
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id) // Check if the item is already in the cart
        setIsAvailableCart(checkingitem) // Set state based on whether the item is in the cart

        const product = cartItem.find(item => item.productId._id === data._id) // Find the item details in the cart
        setQty(product?.quantity) // Set the quantity of the item in the cart
        setCartItemsDetails(product) // Store the item details
    }, [data, cartItem]) // Re-run when 'data' or 'cartItem' changes

    const increaseQty = async (e) => { // Function to increase the quantity of the item in the cart
        e.preventDefault() // Prevent default behavior of the event
        e.stopPropagation() // Stop event propagation

        const response = await updateCartItem(cartItemDetails?._id, qty + 1) // Update the cart item with increased quantity
        
        if (response.success) { // If the API request is successful
            toast.success("Item added") // Show success toast
        }
    }

    const decreaseQty = async (e) => { // Function to decrease the quantity of the item in the cart
        e.preventDefault() // Prevent default behavior of the event
        e.stopPropagation() // Stop event propagation
        if (qty === 1) { // If quantity is 1, delete the item from the cart
            deleteCartItem(cartItemDetails?._id) // Delete the item from the cart
        } else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1) // Decrease the quantity of the item
            
            if (response.success) { // If the API request is successful
                toast.success("Item removed") // Show success toast
            }
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? ( // If the item is available in the cart
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
                            <FaMinus /> {/* Minus icon for decreasing quantity */}
                        </button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p> {/* Display the quantity */}

                        <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
                            <FaPlus /> {/* Plus icon for increasing quantity */}
                        </button>
                    </div>
                ) : ( // If the item is not in the cart, show "Add to Cart" button
                    <button onClick={handleADDTocart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {loading ? <Loading /> : "Add"} {/* Show "Loading" component if loading, else "Add" text */}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton // Export AddToCartButton component
