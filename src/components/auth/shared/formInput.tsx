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
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Field
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          className="w-full p-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-md text-white 
                    placeholder:text-white/60 focus:ring-1 focus:ring-[#E60278] focus:border-transparent text-sm"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
          >
            {showPassword ? (
              <BsEyeSlashFill className="w-4 h-4" />
            ) : (
              <BsEyeFill className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      <ErrorMessage 
        name={name} 
        component="div" 
        className="text-red-300 text-xs mt-1" 
      />
    </div>
  );
}