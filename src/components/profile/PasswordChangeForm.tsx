import React from 'react';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordFormProps {
  passwordData: PasswordData;
  setPasswordData: React.Dispatch<React.SetStateAction<PasswordData>>;
  loading: boolean;
  passwordError: string;
}

export const PasswordChangeForm: React.FC<PasswordFormProps> = ({
  passwordData,
  setPasswordData,
  loading,
  passwordError
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Current Password</label>
        <input
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">New Password</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
        <input
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278]"
          required
          disabled={loading}
        />
      </div>
      {passwordError && (
        <div className="text-red-600 text-sm mt-2">
          {passwordError}
        </div>
      )}
      <div className="text-sm text-gray-600">
        Password must:
        <ul className="list-disc pl-5 mt-1">
          <li>Be at least 8 characters long</li>
          <li>Contain at least one uppercase letter</li>
          <li>Contain at least one lowercase letter</li>
          <li>Contain at least one number</li>
        </ul>
      </div>
    </div>
  );
};