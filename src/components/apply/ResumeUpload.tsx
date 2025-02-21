import { FileText, Upload } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-gray-100 rounded-full">
            {resume ? <FileText className="w-6 h-6 text-[#E60278]" /> : <Upload className="w-6 h-6 text-gray-400" />}
          </div>
          <div className="text-center">
            {resume ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Selected file: <span className="font-medium text-[#E60278]">{resume.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setResume(null)}
                  className="text-sm text-gray-500 hover:text-[#E60278]"
                >
                  Change file
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600">Drag and drop your resume here, or</p>
                <label className="mt-2 cursor-pointer">
                  <span className="text-[#E60278] hover:text-[#E60278]/90 font-medium">
                    browse files
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}