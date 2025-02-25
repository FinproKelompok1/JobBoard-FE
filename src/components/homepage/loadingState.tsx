export default function LoadingState() {
  return (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-md bg-gray-200 flex-shrink-0"></div>
            
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 rounded-full w-28"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}