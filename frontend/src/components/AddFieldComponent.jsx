import React from 'react' // Import React for component functionality
import { IoClose } from "react-icons/io5"; // Import IoClose icon from react-icons for the close button

const AddFieldComponent = ({close, value, onChange, submit}) => { // AddFieldComponent functional component, accepts close, value, onChange, and submit as props
  return (
   <section className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4'>
        {/* Full-screen modal backdrop with opacity, centered content */}
        <div className='bg-white rounded p-4 w-full max-w-md'>
            {/* Modal container with white background and padding */}
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1> {/* Modal title */}
                <button onClick={close}> {/* Close button */}
                    <IoClose size={25}/> {/* Close icon */}
                </button>
            </div>
            <input
                 className='bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full '
                 placeholder='Enter field name' // Placeholder text for input
                 value={value} // Controlled value for the input
                 onChange={onChange} // Trigger onChange event handler on input change
            />
            <button
                onClick={submit} // Trigger submit function on button click
                className='bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block'
            >Add Field</button> {/* Add field button */}
        </div>
   </section>
  )
}

export default AddFieldComponent // Export AddFieldComponent for use in other parts of the app
