import { useState, useRef } from "react";
import { toast } from "react-toastify";

export const useFileUpload = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const isMounted = useRef(true);

  const validateAndSetFile = (file: File) => {
    if (!isMounted.current) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB");
      return;
    }
    setResume(file);
    toast.success("Resume uploaded successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isMounted.current) return;
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (!isMounted.current) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isMounted.current) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  return {
    resume,
    setResume,
    dragActive,
    handleFileChange,
    handleDrag,
    handleDrop,
    isMounted,
  };
};
