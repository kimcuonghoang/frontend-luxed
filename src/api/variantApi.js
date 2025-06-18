import api from "./index";

export const createVariant = (data) => api.post("variants", data);
export const getVariantDetail = async (id) => {
  const res = await api.get(`variants/${id}`);
  return res.data.data;
};
export const updateVariant = (id, data) => api.patch(`variants/${id}`, data);

export const deleteVariant = (id) => api.delete(`variants/${id}`);

export const getAllVariant = (data) => api.get(`variants`, data);
