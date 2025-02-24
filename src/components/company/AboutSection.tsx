interface AboutSectionProps {
  description: string;
}

export function AboutSection({ description }: AboutSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-1 h-6 bg-[#E60278] rounded-full mr-3"></span>
        About Company
      </h2>
      <div 
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}