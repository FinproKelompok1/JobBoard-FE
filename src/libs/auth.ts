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
  otpToken?: string;
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
    const user = document.cookie.split("user=")[1]?.split(";")[0];
    if (!user) return config;
    const token = JSON.parse(user).token;
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

    console.log(response);
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    if (response.data.user) {
      document.cookie = `user=${JSON.stringify({ ...response.data?.user, token: response.data.token })}; path=/`;
    }

    return response;
  },

  completeOauth: async (data: any) => {
    const response = await axios.post("/auth/verify-oauth", {
      type: data.type,
      company: data?.company,
      phone: data?.phone,
      username: data?.username,
    }); // Corrected headers format

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
    const response = await axios.put(`/auth/${userId}/cv`, cvData);
    return response.data;
  } catch (error) {
    console.error("Error updating CV:", error);
    throw error;
  }
};
