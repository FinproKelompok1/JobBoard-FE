export default function ApplicantSekeleton() {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-32 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </td>
      <td><div className="w-32 h-4 bg-gray-300 rounded"></div></td>
      <td><div className="w-24 h-4 bg-gray-300 rounded"></div></td>
      <td><div className="w-20 h-4 bg-gray-300 rounded"></div></td>
      <td><div className="w-24 h-4 bg-gray-300 rounded"></div></td>
      <td><div className="w-16 h-6 bg-gray-400 rounded"></div></td>
      <td><div className="w-10 h-10 bg-gray-300 rounded"></div></td>
    </tr>
  )
}