import api from "./index";

export const createBrand = (data) => api.post("brands", data);
export const getBrandDetail = async (id) => {
  const res = await api.get(`brands/${id}`);
  return res.data.data;
};
export const updateBrand = (id, data) => api.patch(`brands/${id}`, data);

export const deleteBrand = (id) => api.delete(`brands/${id}`);

export const getAllBrand = (data) => api.get(`brands`, data);
