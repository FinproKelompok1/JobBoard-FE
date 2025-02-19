import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
}

export default function FormInput({ label, name, type }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Field
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#E60278] focus:border-transparent"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <BsEyeSlashFill className="w-5 h-5" />
            ) : (
              <BsEyeFill className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-red-500 text-sm mt-1" 
      />
    </div>
  );
}