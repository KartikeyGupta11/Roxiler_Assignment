export const saveAuthData = (token, user, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
