interface ResumeUploadProps {
  resume: File | null;
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setResume: (file: File | null) => void;
}

export function ResumeUpload({
  resume,
  dragActive,
  handleDrag,
  handleDrop,
  handleFileChange,
  setResume
}: ResumeUploadProps) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        Upload Resume (PDF, max 5MB)
      </label>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
          dragActive ? 'border-[#E60278] bg-pink-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {resume ? (
            <div>
              <p>Selected file: {resume.name}</p>
              <button 
                type="button"
                onClick={() => setResume(null)}
                className="text-[#E60278] hover:text-[#E60278]/80"
              >
                Change file
              </button>
            </div>
          ) : (
            <>
              <p>Drag & drop your resume here or</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label 
                htmlFor="resume-upload"
                className="text-[#E60278] hover:text-[#E60278]/80 cursor-pointer"
              >
                browse file
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}