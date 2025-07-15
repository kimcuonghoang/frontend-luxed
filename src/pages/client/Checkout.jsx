import { useEffect, useState } from "react";
import { Input, Select, Checkbox, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { getProvinces, getDistrict, getWard } from "../../api/provincesApi";

export default function Checkout() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // Gọi API để load danh sách tỉnh
  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
      console.log(data);
    };
    fetchProvinces();
  }, []);

  // Khi chọn tỉnh -> load quận/huyện
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const data = await getDistrict({ province_id: selectedProvince });
        setDistricts(data);
        setSelectedDistrict(null); // reset quận và phường
        setWards([]);
        setSelectedWard(null);
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  // Khi chọn quận -> load phường
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const data = await getWard(selectedDistrict);
        setWards(data);
        setSelectedWard(null);
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  return (
    <div className="max-w-7xl mx-auto bg-white py-10 px-4 md:px-16 lg:px-32">
      <h1 className="font-bold text-4xl mb-3 text-center">Checkout</h1>
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-10 pl-20">
          {/* DELIVERY */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Delivery</h2>
            <Input placeholder="Full Name" />
            <Input placeholder="Phone Number" />

            <div className="flex gap-4">
              <Select
                placeholder="Province"
                className="w-full"
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)}
                options={provinces.map((item) => ({
                  label: item.ProvinceName,
                  value: item.ProvinceID,
                }))}
              />
              <Select
                placeholder="District"
                className="w-full"
                value={selectedDistrict}
                onChange={(value) => setSelectedDistrict(value)}
                options={districts.map((item) => ({
                  label: item.DistrictName,
                  value: item.DistrictID,
                }))}
                disabled={!selectedProvince}
              />
              <Select
                placeholder="Ward"
                className="w-full"
                value={selectedWard}
                onChange={(value) => setSelectedWard(value)}
                options={wards.map((item) => ({
                  label: item.WardName,
                  value: item.WardCode,
                }))}
                disabled={!selectedDistrict}
              />
            </div>

            <Input placeholder="Specific address" />
            <Checkbox>Save This Info for Future</Checkbox>
          </div>

          {/* PAYMENT */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment</h2>
            <Select
              defaultValue="Credit Card"
              className="w-full"
              options={[{ label: "Credit Card", value: "Credit Card" }]}
            />
            <Input placeholder="Card Number" prefix={<LockOutlined />} />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Expiration Date" />
              <Input placeholder="Security Code" />
            </div>
            <Input placeholder="Card Holder Name" />
            <Checkbox>Save This Info for Future</Checkbox>
          </div>

          <Button type="primary" block className="bg-black text-white mt-4">
            Pay Now
          </Button>

          <p className="text-xs text-center text-gray-400 mt-4">
            Copyright © 2024 FASCO. All Rights Reserved.
          </p>
        </div>

        {/* CART SUMMARY */}
        <div className="bg-gray-50 p-6 rounded shadow-sm">
          <div className="flex items-start gap-4 border-b pb-4">
            <img
              src="https://picsum.photos/id/1/100/140"
              alt="product"
              className="w-20 h-28 object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                Mini Dress With Ruffled Straps
              </p>
              <p className="text-xs text-gray-600">Red</p>
              <p className="text-sm font-medium mt-2">$100.00</p>
            </div>
          </div>

          <div className="my-4">
            <Input
              placeholder="Discount code"
              addonAfter={
                <Button className="bg-black text-white">Apply</Button>
              }
            />
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$100.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$40.00</span>
            </div>
            <div className="flex justify-between font-semibold text-black">
              <span>Total</span>
              <span>$140.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
