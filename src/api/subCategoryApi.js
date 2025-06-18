import api from "./index";

export const createSubCategory = (data) => api.post("sub-categories", data);
export const getSubCategoryDetail = async (id) => {
  const res = await api.get(`sub-categories/${id}`);
  return res.data.data;
};
export const updateSubCategory = (id, data) =>
  api.patch(`sub-categories/${id}`, data);

export const deleteSubCategory = (id) => api.delete(`sub-categories/${id}`);

export const getAllSubCategory = (data) => api.get(`sub-categories`, data);
