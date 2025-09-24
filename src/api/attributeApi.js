import api from "./index";

// Lấy tất cả attribute
export const getAllAttribute = async () => {
  const res = await api.get("/attribute");
  return res.data;
};

// Lấy chi tiết 1 attribute theo id
export const getAttributeById = async (id) => {
  const res = await api.get(`/attribute/${id}`);
  return res.data;
};

// Tạo mới attribute
export const createAttribute = async (data) => {
  const res = await api.post("/attribute", data);
  return res.data;
};

// Cập nhật attribute
export const updateAttribute = async (id, data) => {
  const res = await api.patch(`/attribute/${id}`, data);
  return res.data;
};

// Xóa cứng attribute
export const deleteAttribute = async (id) => {
  const res = await api.delete(`/attribute/${id}`);
  return res.data;
};

// Soft delete attribute
export const softDeleteAttribute = async (id) => {
  const res = await api.patch(`/attribute/soft-delete/${id}`);
  return res.data;
};

// Restore attribute
export const restoreAttribute = async (id) => {
  const res = await api.patch(`/attribute/restore/${id}`);
  return res.data;
};
