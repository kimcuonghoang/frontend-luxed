import api from "./index";

export const createColor = (data) => api.post("colors", data);
export const getColorDetail = async (id) => {
  const res = await api.get(`colors/${id}`);
  return res.data.data;
};
export const updateColor = (id, data) => api.patch(`colors/${id}`, data);

export const deleteColor = (id) => api.delete(`colors/${id}`);

export const getAllColor = (data) => api.get(`colors`, data);
