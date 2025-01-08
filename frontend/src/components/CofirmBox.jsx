import React from 'react' // Import React to use JSX and hooks
import { IoClose } from "react-icons/io5"; // Import the close icon from react-icons for the close button

// CofirmBox component which takes cancel, confirm, and close as props
const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    // Full screen overlay to show the confirm box in the center
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center'>
      <div className='bg-white w-full max-w-md p-4 rounded'>
        {/* Header with a title and a close button */}
        <div className='flex justify-between items-center gap-3'>
          <h1 className='font-semibold'>Permanent Delete</h1> {/* Title of the confirm box */}
          <button onClick={close}> {/* Button to close the confirm box */}
            <IoClose size={25} /> {/* Close icon */}
          </button>
        </div>
        
        {/* Warning message about permanent delete */}
        <p className='my-4'>Are you sure permanent delete ?</p>
        
        {/* Buttons for cancel and confirm actions */}
        <div className='w-fit ml-auto flex items-center gap-3'>
          <button 
            onClick={cancel} // Cancel action
            className='px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>
            Cancel
          </button>

          <button 
            onClick={confirm} // Confirm action
            className='px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white'>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CofirmBox // Export CofirmBox component for use in other parts of the app
