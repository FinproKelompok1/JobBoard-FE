interface UserTypeToggleProps {
  isCompany: boolean;
  setFieldValue: (field: string, value: boolean) => void;
}

export default function UserTypeToggle({ isCompany, setFieldValue }: UserTypeToggleProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        type="button"
        onClick={() => setFieldValue('isCompany', false)}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          !isCompany
            ? 'bg-[#0D3880] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        User
      </button>
      <button
        type="button"
        onClick={() => setFieldValue('isCompany', true)}
        className={`flex-1 py-2 px-4 rounded-md transition-colors ${
          isCompany
            ? 'bg-[#0D3880] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Company
      </button>
    </div>
  );
}