import { useField } from 'formik';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;  
}

export default function FormInput({ label, ...props }: FormInputProps) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type;

  return (
    <div className="space-y-1">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={inputType}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}