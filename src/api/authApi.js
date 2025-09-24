import api from ".";

export const loginApi = async (data) => await api.post("/auth/login", data);
export const registerApi = async (data) => {
  const res = await api.post("/auth/register", data);
  console.log(res);
  return res.data;
};

export const getUser = () => api.get("/auth/users");
