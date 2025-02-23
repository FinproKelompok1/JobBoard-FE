export default function JobSekeleton() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="w-16 h-6 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-12 h-6 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-20 h-6 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-20 h-6 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </td>
    </tr>
  )
}