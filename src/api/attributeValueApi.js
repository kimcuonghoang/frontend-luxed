import api from "./index";

// Lấy attributeValue theo productId
export const getAttributeValueByProductId = async (productId) => {
  const res = await api.get(`/attribute-value/productId/${productId}`);
  return res.data;
};

// Lấy tất cả attributeValue
export const getAllAttributeValue = async () => {
  const res = await api.get(`/attribute-value`);
  return res.data;
};

// Lấy chi tiết attributeValue theo id
export const getAttributeValueById = async (id) => {
  const res = await api.get(`/attribute-value/${id}`);
  return res.data;
};

// Tạo mới attributeValue
export const createAttributeValue = async (data) => {
  const res = await api.post(`/attribute-value`, data);
  return res.data;
};

// Cập nhật attributeValue
export const updateAttributeValue = async (id, data) => {
  const res = await api.patch(`/attribute-value/${id}`, data);
  return res.data;
};

// Xóa cứng attributeValue
export const deleteAttributeValue = async (id) => {
  const res = await api.delete(`/attribute-value/${id}`);
  return res.data;
};

// Soft delete attributeValue
export const softDeleteAttributeValue = async (id) => {
  const res = await api.patch(`/attribute-value/soft-delete/${id}`);
  return res.data;
};

// Restore attributeValue
export const restoreAttributeValue = async (id) => {
  const res = await api.patch(`/attribute-value/restore/${id}`);
  return res.data;
};
