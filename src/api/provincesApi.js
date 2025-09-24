import axios from "axios";

const BASE_URL = "https://provinces.open-api.vn/api";

// Lấy danh sách tỉnh/thành phố
export const getProvinces = async () => {
  const res = await axios.get(`${BASE_URL}/p/`);
  return res.data; // Mảng các tỉnh
};

// Lấy danh sách quận/huyện theo mã tỉnh (code)
export const getDistricts = async (provinceCode) => {
  const res = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
  return res.data.districts; // Mảng các quận/huyện
};

// Lấy danh sách phường/xã theo mã quận/huyện (code)
export const getWards = async (districtCode) => {
  const res = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
  return res.data.wards; // Mảng các phường/xã
};
``
