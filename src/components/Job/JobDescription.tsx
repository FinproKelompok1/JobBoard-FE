interface JobDescriptionProps {
  description: string;
  tags: string[];
}

export function JobDescription({ description, tags }: JobDescriptionProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div 
          className="prose max-w-none
            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-4 [&>h1]:mb-2
            [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-4 [&>h2]:mb-2
            [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-3 [&>h3]:mb-2
            [&>p]:mb-4
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
            [&>li]:mt-1" 
          dangerouslySetInnerHTML={{ __html: description }} 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}