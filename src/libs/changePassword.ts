// src/services/password.service.ts
import axios from "@/helpers/axios";
import { toast } from "react-toastify";

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  return null;
};

export const forgotPassword = async ({
  email,
  isCompany,
}: {
  email: string;
  isCompany: boolean;
}) => {
  try {
    const endpoint = "/password/forgot-password"; // Updated endpoint
    const response = await axios.post(endpoint, {
      email,
      userType: isCompany ? "admin" : "user",
    });
    toast.success(
      "If an account exists with this email, you will receive password reset instructions.",
    );
    return response.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Failed to process forgot password request";
    toast.error(errorMessage);
    throw err;
  }
};

export const resetPassword = async ({
  token,
  password,
  isCompany,
}: {
  token: string;
  password: string;
  isCompany: boolean;
}) => {
  try {
    const endpoint = "/password/reset-password"; // Updated endpoint
    const response = await axios.post(endpoint, {
      token,
      password,
      userType: isCompany ? "admin" : "user",
    });
    toast.success("Password has been reset successfully");
    return response.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to reset password";
    toast.error(errorMessage);
    throw err;
  }
};

export const changePassword = async (data: PasswordChangeData) => {
  try {
    // Validate passwords match
    if (data.newPassword !== data.confirmPassword) {
      throw new Error("New passwords do not match");
    }

    // Validate password requirements
    const passwordError = validatePassword(data.newPassword);
    if (passwordError) {
      throw new Error(passwordError);
    }

    const response = await axios.put("/password/change-password", {
      // Updated endpoint
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    toast.success("Password changed successfully");
    return response.data;
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "Failed to change password";
    toast.error(errorMessage);
    throw err;
  }
};
