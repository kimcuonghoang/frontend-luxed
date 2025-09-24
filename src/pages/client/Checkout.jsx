import { useEffect, useState } from "react";
import { getProvinces, getDistricts, getWards } from "../../api/provincesApi";
import { createPayment } from "../../api/orderApi";

export default function Checkout() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [onlineProvider, setOnlineProvider] = useState("PAYOS");

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const data = await getDistricts(selectedProvince);
        setDistricts(data);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        const data = await getWards(selectedDistrict);
        setWards(data);
        setSelectedWard("");
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  const handlePayment = async () => {
    try {
      const res = await createPayment({
        fullName: "Nguyễn Văn A",
        phone: "0901234567",
        address: "123 Đường ABC",
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        totalAmount: 10000,
        items: [
          {
            name: "Mini Dress With Ruffled Straps",
            quantity: 1,
            price: 100000,
          },
        ],
      });

      const data = res.data;
      if (data?.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
      } else {
        alert("Không thể tạo link thanh toán");
      }
    } catch (err) {
      console.error("Lỗi khi thanh toán:", err);
      alert("Lỗi tạo thanh toán");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "Online Payment" && onlineProvider === "PAYOS") {
      handlePayment();
    } else {
      console.log("Place order without online PAYOS payment");
    }
  };

  const providerDescriptions = {
    PAYOS: "Thanh toán nhanh chóng qua nền tảng ví điện tử PAYOS.",
    MOMO: "Sử dụng ví điện tử Momo để thanh toán qua mã QR hoặc liên kết ngân hàng.",
    VNPAY: "Thanh toán tiện lợi qua cổng VNPAY bằng ATM hoặc Internet Banking.",
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Delivery Info</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="input" />
              <input
                type="number"
                placeholder="Phone Number"
                className="input"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="input"
                >
                  <option value="">Province</option>
                  {provinces.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="input"
                  disabled={!selectedProvince}
                >
                  <option value="">District</option>
                  {districts.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="input"
                  disabled={!selectedDistrict}
                >
                  <option value="">Ward</option>
                  {wards.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Specific Address"
                className="input"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> Save address info
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="input"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>

              {paymentMethod === "Online Payment" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Chọn hình thức thanh toán:
                    </label>
                    <select
                      value={onlineProvider}
                      onChange={(e) => setOnlineProvider(e.target.value)}
                      className="input"
                    >
                      <option value="PAYOS">PAYOS</option>
                      <option value="MOMO">MOMO</option>
                      <option value="VNPAY">VNPAY</option>
                    </select>

                    <div className="bg-gray-50 border-l-4 border-black px-4 py-2 text-sm text-gray-700 rounded">
                      {providerDescriptions[onlineProvider]}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" /> Save card info
                  </label>
                </>
              )}
            </div>
          </section>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 rounded hover:opacity-90"
          >
            {paymentMethod === "Cash on Delivery" ? "Place Order" : "Pay Now"}
          </button>
        </div>

        <div className="bg-gray-100 p-6 rounded-md space-y-6 shadow-sm">
          <h3 className="text-lg font-semibold border-b pb-2">Order Summary</h3>
          <div className="flex gap-4 border-b pb-4">
            <img
              src="https://picsum.photos/id/1/100/140"
              className="w-20 h-28 object-cover rounded"
              alt="product"
            />
            <div>
              <p className="text-sm font-medium">
                Mini Dress With Ruffled Straps
              </p>
              <p className="text-xs text-gray-500">Color: Red</p>
              <p className="text-sm font-semibold mt-2">$100.00</p>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Discount code"
              className="input flex-1"
            />
            <button className="bg-black text-white px-4 rounded hover:opacity-90">
              Apply
            </button>
          </div>

          <div className="space-y-2 text-sm">
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
