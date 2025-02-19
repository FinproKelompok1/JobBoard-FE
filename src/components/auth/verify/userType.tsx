import { Dispatch, SetStateAction } from "react";

interface UserTypeToggleProps {
    userType: string;
    setUserType: Dispatch<SetStateAction<string>>;
}

export default function UserType({
    userType,
    setUserType,
}: UserTypeToggleProps) {

    return (
        <div className="flex gap-4 mb-8">
            <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${userType === 'user' ? "bg-[#0D3880] text-white" : "bg-gray-100 text-gray-600"
                    }`}
            >
                Job Seeker
            </button>
            <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${userType !== 'user' ? "bg-[#0D3880] text-white" : "bg-gray-100 text-gray-600"
                    }`}
            >
                Employer
            </button>
        </div>
    );
}