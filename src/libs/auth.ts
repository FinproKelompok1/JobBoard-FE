import axios from "@/helpers/axios";
import { CurriculumVitae } from "@/types/profile";
import { jwtDecode } from "jwt-decode";

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
}

interface UserData {
  id: string;
  email: string;
  username?: string;
  role: string;
  isEmailVerified: boolean;
  profile?: {
    fullName?: string;
    avatar?: string;
  };
}

interface AuthResponse {
  token: string;
  user: UserData;
}

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

axios.interceptors.request.use(
  (config) => {
    const token = document.cookie.split("token=")[1]?.split(";")[0];
    console.log("Token:", token); // Cek apakah token ada
    if (token) {
      console.log("Header Auth:", `Bearer ${token}`); // Cek format header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
export const authService = {
  login: async (data: LoginData) => {
    const response = await axios.post("/auth/login/user", data, {
      withCredentials: true, // Tambahkan ini
    });

    // Tambahkan logic untuk set cookie
    if (response.data.token) {
      document.cookie = `token=${response.data.token}; path=/`;
      document.cookie = `user=${JSON.stringify(response.data.user)}; path=/`;
    }

    return response;
  },
  loginAdmin: async (data: LoginData) => {
    return axios.post("/auth/login/admin", data);
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
      const response = await axios.get(`/auth/${provider}/callback`, {
        params: { code },
      });
      return true;
    } catch (error) {
      console.error("Social auth error:", error);
      return false;
    }
  },
};

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getUserProfile = async () => {
  try {
    const response = await axios.get("/auth/me"); // ganti endpoint sesuai BE
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateProfile = async (userId: string, data: any) => {
  try {
    const response = await axios.put(`/auth/profile/${userId}`, data);
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
    // Changed from /auth/${userId}/cv to /auth/profile/${userId}/cv
    const response = await axios.put(`/auth/profile/${userId}/cv`, cvData);
    return response.data;
  } catch (error) {
    console.error("Error updating CV:", error);
    throw error;
  }
};
