import api from "./index";

export const createSize = (data) => api.post("sizes", data);
export const getSizeDetail = async (id) => {
  const res = await api.get(`sizes/${id}`);
  return res.data.data;
};
export const updateSize = (id, data) => api.patch(`sizes/${id}`, data);

export const deleteSize = (id) => api.delete(`sizes/${id}`);

export const getAllSize = (data) => api.get(`sizes`, data);
