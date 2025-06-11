import api from "./index";

export const createProduct = (data) => api.post("products", data);

export const getProductDetail = async (id) => {
  const res = await api.get(`products/${id}`);
  return res.data.data;
};
export const getProductById = (id) => api.get(`/products/${id}`);

export const updateProduct = (id, data) => api.patch(`products/${id}`, data);

export const deleteProduct = (id) => api.delete(`products/${id}`);

export const getAllProduct = (data) => api.get(`products`, data);
