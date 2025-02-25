export default function JobSekeleton() {
  return (
    <tr className="animate-pulse border-b">
      <td className="p-3">
        <div className="h-5 w-16 bg-gray-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-5 w-32 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-5 w-10 bg-gray-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-5 w-12 bg-gray-300 rounded"></div>
      </td>
      <td className="p-3">
        <div className="h-5 w-14 bg-gray-300 rounded"></div>
      </td>
      <td className="p-3 flex items-center gap-3">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </td>
    </tr>
  )
}