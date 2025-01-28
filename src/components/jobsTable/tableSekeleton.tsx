export default function TableSekeleton() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </td>
      <td>
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </td>
    </tr>
  )
}