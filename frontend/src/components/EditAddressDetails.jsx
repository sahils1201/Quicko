import React from 'react' // Importing React to use JSX
import { useForm } from "react-hook-form" // Importing the useForm hook for form management
import Axios from '../utils/Axios' // Importing Axios utility for making API requests
import SummaryApi from '../common/SummaryApi' // Importing API endpoint configurations
import toast from 'react-hot-toast' // Importing toast for showing success or error messages
import AxiosToastError from '../utils/AxiosToastError' // Importing utility for error handling
import { IoClose } from "react-icons/io5"; // Importing close icon from react-icons
import { useGlobalContext } from '../provider/GlobalProvider' // Importing global context to access global functions

const EditAddressDetails = ({close, data}) => {
    // Initializing form methods with default values from the provided 'data'
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id: data._id,
            userId: data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            mobile: data.mobile,
        }
    })

    const { fetchAddress } = useGlobalContext() // Using fetchAddress from global context

    // Function to handle form submission
    const onSubmit = async (formData) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress, // API call to update address
                data: formData // Sending the form data to the API
            })

            const { data: responseData } = response
            
            if (responseData.success) {
                toast.success(responseData.message) // Show success message
                if (close) {
                    close() // Close the form modal
                    reset() // Reset the form values
                    fetchAddress() // Re-fetch the address data
                }
            }
        } catch (error) {
            AxiosToastError(error) // Handle API errors
        }
    }

  return (
    // Fullscreen background overlay
    <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
        <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
            {/* Modal header with close button */}
            <div className='flex justify-between items-center gap-4'>
                <h2 className='font-semibold'>Edit Address</h2>
                <button onClick={close} className='hover:text-red-500'>
                    <IoClose size={25} />
                </button>
            </div>

            {/* Form to edit address details */}
            <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                {/* Address Line Input */}
                <div className='grid gap-1'>
                    <label htmlFor='addressline'>Address Line :</label>
                    <input
                        type='text'
                        id='addressline' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("address_line", { required: true })} // Register input field with react-hook-form
                    />
                </div>

                {/* City Input */}
                <div className='grid gap-1'>
                    <label htmlFor='city'>City :</label>
                    <input
                        type='text'
                        id='city' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("city", { required: true })}
                    />
                </div>

                {/* State Input */}
                <div className='grid gap-1'>
                    <label htmlFor='state'>State :</label>
                    <input
                        type='text'
                        id='state' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("state", { required: true })}
                    />
                </div>

                {/* Pincode Input */}
                <div className='grid gap-1'>
                    <label htmlFor='pincode'>Pincode :</label>
                    <input
                        type='text'
                        id='pincode' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("pincode", { required: true })}
                    />
                </div>

                {/* Country Input */}
                <div className='grid gap-1'>
                    <label htmlFor='country'>Country :</label>
                    <input
                        type='text'
                        id='country' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("country", { required: true })}
                    />
                </div>

                {/* Mobile Input */}
                <div className='grid gap-1'>
                    <label htmlFor='mobile'>Mobile No. :</label>
                    <input
                        type='text'
                        id='mobile' 
                        className='border bg-blue-50 p-2 rounded'
                        {...register("mobile", { required: true })}
                    />
                </div>

                {/* Submit Button */}
                <button type='submit' className='bg-primary-200 w-full py-2 font-semibold mt-4 hover:bg-primary-100'>
                    Submit
                </button>
            </form>
        </div>
    </section>
  )
}

export default EditAddressDetails
