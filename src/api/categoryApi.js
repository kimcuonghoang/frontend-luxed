import api from "./index";

export const createCategory = (data) => api.post("categories", data);
export const getCategoryDetail = async (id) => {
  const res = await api.get(`categories/${id}`);
  return res.data.data;
};
export const updateCategory = (id, data) => api.patch(`categories/${id}`, data);

export const deleteCategory = (id) => api.delete(`categories/${id}`);

export const getAllCategory = (data) => api.get(`categories`, data);
