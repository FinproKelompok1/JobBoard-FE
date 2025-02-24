import { Mail, Phone } from 'lucide-react';

interface ContactInfoProps {
  email: string;
  phone: string;
}

export function ContactInfo({ email, phone }: ContactInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <span className="w-1 h-6 bg-[#E60278] rounded-full mr-3"></span>
        Contact Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-300">
          <Mail className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Email</p>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors duration-300">
          <Phone className="w-5 h-5 text-[#E60278] mt-1 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Phone</p>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}