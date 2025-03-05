import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { CurriculumVitae } from "@/types/profile";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface AdminRegisterData {
  companyName: string;
  email: string;
  noHandphone: string;
  password: string;
  description?: string;
}

interface UserRegisterData {
  email: string;
  username: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
  otpToken?: string;
}

interface OauthData {
  type: string;
  company?: string;
  phone?: string;
  username?: string;
}

export const authService = {
  login: async (data: LoginData) => {
    try {
      const response = await axios.post("/auth/login/user", data, {});

      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      if (response.data.user) {
        document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token, role: "user" })}; path=/`;
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      throw error;
    }
  },

  loginAdmin: async (data: LoginData) => {
    try {
      const response = await axios.post("/auth/login/admin", data);

      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      if (response.data.admin) {
        document.cookie = `user=${JSON.stringify({ ...response.data?.admin, token: response.data.token, role: "admin" })}; path=/`;
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Invalid admin credentials. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      throw error;
    }
  },

  loginDeveloper: async (data: LoginData) => {
    try {
      const response = await axios.post("/auth/developer/login", data);

      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      if (response.data.user) {
        document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token })}; path=/`;
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error("Invalid developer credentials. Please try again.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
      throw error;
    }
  },

  completeOauth: async (data: OauthData) => {
    try {
      const response = await axios.post("/auth/verify-oauth", {
        type: data.type,
        company: data?.company,
        phone: data?.phone,
        username: data?.username,
      });

      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      if (response.data.user) {
        document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token, role: data.type })}; path=/`;
      }
      return response;
    } catch (error) {
      toastErrAxios(error);
      toast.error("Failed to complete OAuth authentication.");
      throw error;
    }
  },

  registerUser: async (data: UserRegisterData) => {
    try {
      const response = await axios.post("/auth/register/user", data);
      toast.success(
        "Registration successful! Please check your email for verification.",
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error("Email already in use. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
      throw error;
    }
  },

  registerAdmin: async (data: AdminRegisterData) => {
    try {
      const response = await axios.post("/auth/register/admin", data);
      toast.success(
        "Company registration successful! Please check your email for verification.",
      );
      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.error("Email already in use. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
      throw error;
    }
  },

  verifyEmail: async (token: string) => {
    try {
      const response = await axios.get(`/auth/verify?token=${token}`);
      toast.success("Email verification successful!");
      return response;
    } catch (error) {
      toastErrAxios(error);
      toast.error(
        "Email verification failed. The link may be expired or invalid.",
      );
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axios.post("/auth/logout");
      toast.success("You have been successfully logged out.");
      return response;
    } catch (error) {
      toastErrAxios(error);
      throw error;
    }
  },

  handleSocialAuth: async (provider: "google" | "facebook") => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/auth/${provider}`;
    } catch (error) {
      toast.error(`Failed to connect with ${provider}. Please try again.`);
      throw error;
    }
  },

  handleSocialAuthCallback: async (
    provider: "google" | "facebook",
    code: string,
  ) => {
    try {
      await axios.get(`/auth/${provider}/callback`, {
        params: { code },
      });
      toast.success(`Successfully authenticated with ${provider}!`);
      return true;
    } catch (error) {
      toastErrAxios(error);
      toast.error(`Failed to complete ${provider} authentication.`);
      return false;
    }
  },

  getUserProfile: async () => {
    try {
      const response = await axios.get("/auth/me");
      return response.data;
    } catch (error) {
      toastErrAxios(error);
      toast.error("Failed to load user profile.");
      throw error;
    }
  },

  checkProfileCompletion: async () => {
    try {
      const response = await axios.get("/auth/check-completion");
      return response.data;
    } catch (error) {
      toastErrAxios(error);
      toast.error("Failed to check profile completion status.");
      throw error;
    }
  },
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get("/auth/me");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error("Failed to load user profile.");
    throw error;
  }
};

interface ProfileUpdateData {
  username?: string;
  full_name?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
}

export const UpdateProfile = async (
  userId: string,
  data: ProfileUpdateData,
) => {
  try {
    const response = await axios.put(`/auth/${userId}`, data);
    toast.success("Profile updated successfully!");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error("Failed to update profile.");
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    toast.error("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
    return Promise.reject(new Error("Invalid file type"));
  }

  const maxSize = 1 * 1024 * 1024;
  if (file.size > maxSize) {
    toast.error("Ukuran file tidak boleh melebihi 1 MB.");
    return Promise.reject(new Error("File size exceeds limit"));
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post("/auth/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Profile image uploaded successfully!");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error("Failed to upload profile image.");
    throw error;
  }
};

export const updateCV = async (
  userId: number,
  cvData: Partial<CurriculumVitae>,
) => {
  try {
    const response = await axios.put(`/auth/${userId}/cv`, cvData);
    toast.success("CV updated successfully!");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error("Failed to update CV information.");
    throw error;
  }
};

export const changeEmail = async ({
  newEmail,
  password,
}: {
  newEmail: string;
  password: string;
}) => {
  try {
    const response = await axios.put("/auth/change-email", {
      newEmail,
      password,
    });

    toast.success("Please check your new email for verification link");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error("Incorrect password. Please try again.");
    } else if (error instanceof AxiosError && error.response?.status === 409) {
      toast.error("Email already in use. Please use a different email.");
    } else {
      toast.error("Failed to change email. Please try again later.");
    }
    throw error;
  }
};

export const verifyEmailChange = async (token: string) => {
  try {
    const response = await axios.get(
      `/auth/verify-email-change?token=${token}`,
    );
    toast.success("Email changed successfully!");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error(
      "Email change verification failed. The link may be expired or invalid.",
    );
    throw error;
  }
};

export const changeAdminEmail = async ({
  newEmail,
  password,
}: {
  newEmail: string;
  password: string;
}) => {
  try {
    const response = await axios.put("/auth/admin/change-email", {
      newEmail,
      password,
    });

    toast.success("Please check your new email for verification link");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      toast.error("Incorrect password. Please try again.");
    } else if (error instanceof AxiosError && error.response?.status === 409) {
      toast.error("Email already in use. Please use a different email.");
    } else {
      toast.error("Failed to change email. Please try again later.");
    }
    throw error;
  }
};

export const verifyAdminEmailChange = async (token: string) => {
  try {
    const response = await axios.get(
      `/auth/admin/verify-email-change?token=${token}`,
    );
    toast.success("Admin email changed successfully!");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    toast.error(
      "Admin email change verification failed. The link may be expired or invalid.",
    );
    throw error;
  }
};

export const checkIfOauthUser = async (
  email: string,
  isCompany: boolean = false,
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `/auth/check-oauth-user?email=${encodeURIComponent(email)}&userType=${isCompany ? "admin" : "user"}`,
    );
    return response.data.isOauthUser;
  } catch (error) {
    console.error("Error checking OAuth status:", error);
    toastErrAxios(error);
    toast.error("Failed to verify account type.");
    return false;
  }
};
