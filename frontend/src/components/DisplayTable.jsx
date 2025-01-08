import React from 'react' // Import React to use JSX
import {
  createColumnHelper, // Helper for creating columns dynamically
  flexRender, // Function to render cell and header content
  getCoreRowModel, // Core row model to manage row data
  useReactTable, // Main hook to manage table state and behavior
} from '@tanstack/react-table' // Import React Table hooks

const DisplayTable = ({ data, column }) => {
  // Initialize the table using React Table hook
  const table = useReactTable({
    data, // Data to display in the table
    columns: column, // Columns configuration
    getCoreRowModel: getCoreRowModel(), // Use core row model for row rendering
  })

  return (
    <div className="p-2">
      {/* Table layout */}
      <table className='w-full py-0 px-0 border-collapse'>
        {/* Table header */}
        <thead className='bg-black text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th>Sr.No</th> {/* Serial Number column */}
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border whitespace-nowrap'>
                  {/* Render header content */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table body */}
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              {/* Render Serial Number */}
              <td className='border px-2 py-1'>{index + 1}</td>
              {/* Render table cells */}
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border px-2 py-1 whitespace-nowrap'>
                  {/* Render cell content */}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Optional space at the bottom */}
      <div className="h-4" />
    </div>
  )
}

export default DisplayTable
