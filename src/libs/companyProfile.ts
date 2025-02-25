import axios from "@/helpers/axios";
import { toast } from "react-toastify";
import { AdminProfile, ProfileFormData } from "@/types/company";

const getCookieValue = (name: string) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const getAdminProfile = async (): Promise<AdminProfile> => {
  try {
    const user = getCookieValue("user");
    if (!user) throw new Error("No user data found");

    const userData = JSON.parse(user);
    const token = userData.token;

    const response = await axios.get("/companies/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    toast.error("Failed to fetch profile");
    throw err;
  }
};

export const updateAdminProfile = async (data: ProfileFormData) => {
  try {
    const user = getCookieValue("user");
    if (!user) throw new Error("No user data found");

    const userData = JSON.parse(user);
    const token = userData.token;

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== "cityCoordinates") {
        formData.append(key, value);
      }
    });

    if (data.cityCoordinates) {
      formData.append("latitude", data.cityCoordinates.latitude.toString());
      formData.append("longitude", data.cityCoordinates.longitude.toString());
    }

    const response = await axios.put("/companies/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Profile updated successfully");
    return response.data;
  } catch (err) {
    toast.error("Failed to update profile");
    throw err;
  }
};
