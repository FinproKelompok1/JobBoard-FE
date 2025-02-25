export const logOut = () => {
  const paths = ["/", "/admin", "/admin/dashboard", "/auth", "/profile", ""];

  paths.forEach((path) => {
    document.cookie = `user=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    document.cookie = `token=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  });

  window.location.href = "/";
};

export default logOut;
