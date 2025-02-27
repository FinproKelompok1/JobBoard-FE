import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { CurriculumVitae } from "@/types/profile";
import { toast } from "react-toastify";
import { getUserData } from "@/helpers/cookies";

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
    const response = await axios.post("/auth/login/user", data, {
      withCredentials: true,
    });

    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    if (response.data.user) {
      document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token, role: "user" })}; path=/`;
    }

    return response;
  },

  loginAdmin: async (data: LoginData) => {
    const response = await axios.post("/auth/login/admin", data);

    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    if (response.data.admin) {
      document.cookie = `user=${JSON.stringify({ ...response.data?.admin, token: response.data.token, role: "admin" })}; path=/`;
    }

    return response;
  },

  loginDeveloper: async (data: LoginData) => {
    const response = await axios.post("/auth/developer/login", data);

    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    if (response.data.user) {
      document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token })}; path=/`;
    }

    return response;
  },

  completeOauth: async (data: OauthData) => {
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
  },

  registerUser: async (data: UserRegisterData) => {
    return axios.post("/auth/register/user", data);
  },

  registerAdmin: async (data: AdminRegisterData) => {
    return axios.post("/auth/register/admin", data);
  },

  verifyEmail: async (token: string) => {
    return axios.get(`/auth/verify?token=${token}`);
  },

  logout: async () => {
    return axios.post("/auth/logout");
  },

  handleSocialAuth: async (provider: "google" | "facebook") => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL_BE}/auth/${provider}`;
  },

  handleSocialAuthCallback: async (
    provider: "google" | "facebook",
    code: string,
  ) => {
    try {
      await axios.get(`/auth/${provider}/callback`, {
        params: { code },
      });
      return true;
    } catch {
      return false;
    }
  },

  getUserProfile: async () => {
    try {
      const response = await axios.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkProfileCompletion: async () => {
    try {
      const response = await axios.get("/auth/check-completion");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get("/auth/me");
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post("/auth/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCV = async (
  userId: number,
  cvData: Partial<CurriculumVitae>,
) => {
  try {
    const response = await axios.put(`/auth/${userId}/cv`, cvData);
    return response.data;
  } catch (error) {
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
    toastErrAxios(error);
    throw error;
  }
};

export const verifyEmailChange = async (token: string) => {
  try {
    const response = await axios.get(
      `/auth/verify-email-change?token=${token}`,
    );
    return response.data;
  } catch (error) {
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
    toastErrAxios(error);
    throw error;
  }
};

export const verifyAdminEmailChange = async (token: string) => {
  try {
    const response = await axios.get(
      `/auth/admin/verify-email-change?token=${token}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
