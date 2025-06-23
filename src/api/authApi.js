import api from ".";

export const loginApi = (data) => api.post("/auth/login", data);
export const registerApi = (data) => api.post("/auth/register", data);

export const getUser = () => api.get("/auth/users");
