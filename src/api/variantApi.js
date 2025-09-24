import api from ".";

// Lấy tất cả variants
export const getAllVariants = async () => {
  const res = await api.get(`/variants`);
  return res.data;
};

// Lấy variant chi tiết theo id
export const getVariantById = async (id) => {
  const res = await api.get(`/variants/${id}`);
  return res.data;
};

// Lấy danh sách variant theo productId
export const getVariantsByProduct = async (productId) => {
  const res = await api.get(`/variants/product/${productId}`);
  return res.data;
};

// Tạo variant
export const createVariant = async (data) => {
  const res = await api.post(`/variants`, data);
  return res.data;
};

// Cập nhật variant
export const updateVariant = async (id, data) => {
  const res = await api.patch(`/variants/${id}`, data);
  return res.data;
};

// Xóa variant
export const deleteVariant = async (id) => {
  const res = await api.delete(`/variants/${id}`);
  return res.data;
};
