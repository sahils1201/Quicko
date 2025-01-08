import React from 'react' // Import React for component functionality
import { useForm } from "react-hook-form" // Import useForm from react-hook-form to manage form state and validation
import Axios from '../utils/Axios' // Import Axios for making HTTP requests
import SummaryApi from '../common/SummaryApi' // Import API endpoint configuration for creating addresses
import toast from 'react-hot-toast' // Import toast for showing success/error notifications
import AxiosToastError from '../utils/AxiosToastError' // Import custom error handler for Axios
import { IoClose } from "react-icons/io5"; // Import IoClose icon from react-icons for the close button
import { useGlobalContext } from '../provider/GlobalProvider' // Import context hook to access global state (fetchAddress function)

const AddAddress = ({close}) => { // AddAddress component, accepts 'close' prop to close the modal
    const { register, handleSubmit, reset } = useForm() // Destructure hook methods from useForm: register inputs, handle form submission, reset form
    const { fetchAddress } = useGlobalContext() // Destructure fetchAddress function from global context

    const onSubmit = async (data) => { // onSubmit function that is triggered on form submission
        console.log("data", data) // Log form data for debugging

        try {
            // Make an API call using Axios with the createAddress configuration and send the form data
            const response = await Axios({
                ...SummaryApi.createAddress, // Spread the API configuration for creating an address
                data: {
                    address_line: data.addressline, // Map form fields to API request data
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    mobile: data.mobile
                }
            })

            const { data: responseData } = response // Extract response data from Axios response

            if (responseData.success) { // Check if the API request was successful
                toast.success(responseData.message) // Display success toast notification
                if (close) { // If the close function is passed as prop
                    close() // Close the modal
                    reset() // Reset the form fields
                    fetchAddress() // Fetch the updated address list
                }
            }
        } catch (error) {
            AxiosToastError(error) // Handle errors using custom AxiosToastError function
        }
    }

    return (
        <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
            {/* Modal background with full-screen overlay */}
            <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
                {/* Modal container */}
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='font-semibold'>Add Address</h2> {/* Modal title */}
                    <button onClick={close} className='hover:text-red-500'>
                        <IoClose size={25}/> {/* Close button with icon */}
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    {/* Form structure with input fields */}
                    <div className='grid gap-1'>
                        <label htmlFor='addressline'>Address Line :</label>
                        <input
                            type='text'
                            id='addressline' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("addressline", { required: true })} // Register addressline input with validation
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type='text'
                            id='city' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city", { required: true })} // Register city input with validation
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State :</label>
                        <input
                            type='text'
                            id='state' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("state", { required: true })} // Register state input with validation
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='pincode'>Pincode :</label>
                        <input
                            type='text'
                            id='pincode' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("pincode", { required: true })} // Register pincode input with validation
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country :</label>
                        <input
                            type='text'
                            id='country' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country", { required: true })} // Register country input with validation
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No. :</label>
                        <input
                            type='text'
                            id='mobile' 
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobile", { required: true })} // Register mobile input with validation
                        />
                    </div>

                    <button type='submit' className='bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100'>
                        Submit
                    </button> {/* Submit button */}
                </form>
            </div>
        </section>
    )
}

export default AddAddress // Export AddAddress component
