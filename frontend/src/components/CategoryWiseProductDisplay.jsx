import React, { useEffect, useRef, useState } from 'react' // Import necessary React hooks for state and lifecycle management
import { Link } from 'react-router-dom' // Import Link for navigation within the app
import AxiosToastError from '../utils/AxiosToastError' // Import custom utility for handling Axios errors
import Axios from '../utils/Axios' // Import Axios instance for making API requests
import SummaryApi from '../common/SummaryApi' // Import the API configurations for category products
import CardLoading from './CardLoading' // Import loading card component for displaying while data is fetching
import CardProduct from './CardProduct' // Import product card component to display each product
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Import icons for scrolling functionality
import { useSelector } from 'react-redux' // Import useSelector to access the Redux store state
import { valideURLConvert } from '../utils/valideURLConvert' // Import utility for converting strings to valid URLs

const CategoryWiseProductDisplay = ({ id, name }) => { // CategoryWiseProductDisplay component, receiving id and name as props
    const [data, setData] = useState([]) // State to store product data
    const [loading, setLoading] = useState(false) // State to manage loading status
    const containerRef = useRef() // Ref to store the reference of the scrollable container
    const subCategoryData = useSelector(state => state.product.allSubCategory) // Get subcategory data from Redux store
    const loadingCardNumber = new Array(6).fill(null) // Dummy array for displaying loading skeletons (6 items)

    // Function to fetch products by category
    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true) // Set loading to true while fetching data
            const response = await Axios({
                ...SummaryApi.getProductByCategory, // API configuration to fetch products by category
                data: { id: id } // Send category id in the request
            })

            const { data: responseData } = response // Extract data from response

            if (responseData.success) {
                setData(responseData.data) // Set product data in state if the request is successful
            }
        } catch (error) {
            AxiosToastError(error) // Handle errors using the custom Axios error handler
        } finally {
            setLoading(false) // Set loading to false once the request completes
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct() // Fetch products when the component mounts
    }, []) // Empty dependency array to run once on mount

    // Function to scroll the container to the right
    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200 // Scroll 200px to the right
    }

    // Function to scroll the container to the left
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200 // Scroll 200px to the left
    }

    // Function to handle redirection to the product list page for the category
    const handleRedirectProductListpage = () => {
        const subcategory = subCategoryData.find(sub => {
            const filterData = sub.category.some(c => c._id === id) // Find subcategory that matches the category id
            return filterData ? true : null // Return true if a matching subcategory is found
        })
        const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}` // Construct the URL for the product list page
        return url
    }

    const redirectURL = handleRedirectProductListpage() // Get the redirect URL

    return (
        <div>
            {/* Header section */}
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3> {/* Category name */}
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link> {/* Link to the full product list */}
            </div>

            {/* Product display section */}
            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {/* Loop over loadingCardNumber to display loading skeletons if loading is true */}
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategorywiseProductDisplay123" + index} /> // Display loading skeleton cards
                            )
                        })
                    }

                    {/* Loop through product data to display actual product cards */}
                    {data.map((p, index) => {
                        return (
                            <CardProduct
                                data={p}
                                key={p._id + "CategorywiseProductDisplay" + index} // Key to ensure uniqueness of each product card
                            />
                        )
                    })}
                </div>

                {/* Scroll buttons for mobile and tablet view */}
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft /> {/* Left scroll button */}
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight /> {/* Right scroll button */}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay // Export the CategoryWiseProductDisplay component
