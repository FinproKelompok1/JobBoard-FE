export default function ApplicantSekeleton() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-5 bg-gray-300 rounded"></div>
          <div className="w-12 h-5 bg-gray-300 rounded"></div>
        </div>
      </td>
      <td>
        <div className="w-24 h-5 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-40 h-5 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-20 h-5 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="w-24 h-5 bg-gray-300 rounded"></div>
      </td>
    </tr>
  )
}