import React, { useState } from 'react' // Importing React and useState hook for managing state
import { IoClose } from "react-icons/io5"; // Importing close icon from react-icons
import uploadImage from '../utils/UploadImage'; // Importing utility function for uploading images
import Axios from '../utils/Axios'; // Importing Axios for making HTTP requests
import SummaryApi from '../common/SummaryApi'; // Importing API endpoint configurations
import toast from 'react-hot-toast' // Importing toast for showing notifications
import AxiosToastError from '../utils/AxiosToastError'; // Importing custom error handling utility

const EditCategory = ({close, fetchData, data: CategoryData}) => {
    // Local state to store category data (name and image URL)
    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image,
    });

    const [loading, setLoading] = useState(false); // State to handle loading status

    // Function to handle input field changes
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Updating the state with the new value for the corresponding input field
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            setLoading(true); // Set loading state to true while the request is being processed
            const response = await Axios({
                ...SummaryApi.updateCategory, // API endpoint for updating the category
                data, // Sending the updated category data
            });
            const { data: responseData } = response;

            // If the response is successful, show a success message and close the form
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData(); // Re-fetch category data after the update
            }
        } catch (error) {
            AxiosToastError(error); // Handle errors by displaying a toast notification
        } finally {
            setLoading(false); // Set loading state back to false after the request completes
        }
    };

    // Function to handle category image upload
    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return; // Return if no file is selected
        }

        setLoading(true); // Set loading to true while the image is being uploaded
        const response = await uploadImage(file); // Call the image upload function
        const { data: ImageResponse } = response;
        setLoading(false); // Set loading back to false after the image upload is completed

        // Update the image URL in the state with the uploaded image URL
        setData((prev) => ({
            ...prev,
            image: ImageResponse.data.url,
        }));
    };

    return (
        // Modal structure for editing category
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                {/* Modal header with category edit title and close button */}
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'>Update Category</h1>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoClose size={25} />
                    </button>
                </div>
                
                {/* Form to update category details */}
                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    {/* Category Name Input */}
                    <div className='grid gap-1'>
                        <label htmlFor='categoryName'>Name</label>
                        <input
                            type='text'
                            id='categoryName'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
                        />
                    </div>

                    {/* Category Image Upload */}
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                {/* Displaying the current category image or a placeholder */}
                                {data.image ? (
                                    <img
                                        alt='category'
                                        src={data.image}
                                        className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    <p className='text-sm text-neutral-500'>No Image</p>
                                )}
                            </div>

                            {/* Image Upload Button */}
                            <label htmlFor='uploadCategoryImage'>
                                <div
                                    className={`
                                    ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100"}  
                                        px-4 py-2 rounded cursor-pointer border font-medium
                                    `}
                                >
                                    {loading ? "Loading..." : "Upload Image"}
                                </div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategoryImage}
                                    type='file'
                                    id='uploadCategoryImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`
                        ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300 "}
                        py-2    
                        font-semibold 
                        text-white
                        `}
                    >
                        Update Category
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditCategory;
