export const getCookie = (name: string) => {
  try {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    return value ? value : null;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

export const getUserData = () => {
  try {
    const userStr = getCookie("user");
    return userStr ? JSON.parse(decodeURIComponent(userStr)) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
