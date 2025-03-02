"use client";

export const getCookie = (name: string) => {
  try {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

export const getUserData = () => {
  try {
    const userStr = getCookie("user");
    if (!userStr) {
      console.error("No user cookie found");
      return null;
    }

    const userData = JSON.parse(userStr);

    return userData;
  } catch {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    return null;
  }
};
