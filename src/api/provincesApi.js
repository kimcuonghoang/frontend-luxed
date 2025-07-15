const TOKEN = import.meta.env.VITE_TOKEN_API;
import axios from "axios";

export const getProvinces = async () => {
  const res = await axios.get(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    {
      headers: {
        token: TOKEN,
      },
    }
  );
  return res.data.data;
};

export const getDistrict = async (body) => {
  const res = await axios.post(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    body,
    {
      headers: {
        token: TOKEN,
      },
    }
  );
  return res.data.data;
};

export const getWard = async (district_id) => {
  const res = await api.get(
    `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
    {
      headers: {
        Token: TOKEN,
      },
    }
  );
  return res.data.data;
};
