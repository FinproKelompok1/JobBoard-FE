const getCookieValue = (name: string) => {
  const cookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const getToken = () => {
  if (typeof document === "undefined") return null;
  const user = getCookieValue("user");
  console.log("user", user);
  if (!user) throw new Error("No user data found");

  const userData = JSON.parse(user);
  const token = userData.token;

  return token;
};
