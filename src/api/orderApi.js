import api from "./index";

export const createOrder = (data) => api.post("/order", data);

export const createPayment = (data) => {
  return api.post("/order/createPayment", data);
};
