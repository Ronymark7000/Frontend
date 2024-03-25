import axiosInstance from "../../axiosInstance";

export const handleLogin = async (email, password) => {
  const response = await axiosInstance
    .post("/auth/login", { email, password })
    .then((res) => res?.data)
    .catch(() => null);

  if (response?.success) {
    "Success Login"
    // getProfile();
    // getAllFromCart();
  }
  return response;
};

export const handleSignup = async (firstname, lastname, password, email, contact ) => {
  return await axiosInstance
    .post("/auth/register", { firstname, lastname, password, email, contact })
    .then((res) => res?.data)
    .catch(() => null);
};
