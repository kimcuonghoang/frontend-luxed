import { useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const price = 14.9;

  const [wrap, setWrap] = useState(false);

  const subtotal = wrap ? 100.0 : (price * quantity).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-20">
        <h1 className="font-bold text-4xl mb-3 text-center">Shopping Cart</h1>
        <div className="flex gap-3 items-center justify-center">
          <Link to="/">Home</Link>
          <MdNavigateNext />
          <Link to="/shop">Your Shopping Cart</Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] w-full items-center border-b-2 pb-2 text-left font-medium text-xl">
          <div>Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Total</div>
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] w-full items-center py-4 border-b text-sm">
          <div className="flex items-start gap-4">
            <img
              src="https://picsum.photos/id/1/200/300"
              alt="dress"
              className="w-20 h-28 object-cover rounded"
            />
            <div>
              <p className="font-medium text-sm">
                Mini Dress With Ruffled Straps
              </p>
              <p className="text-xs text-gray-600 mt-1">Color: Red</p>
              <button className="text-xs text-blue-500 hover:underline flex items-center mt-1">
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>

          <div className="text-center font-medium">${price.toFixed(2)}</div>

          <div className="flex items-center justify-center gap-2">
            <Button
              icon={<MinusOutlined />}
              size="small"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            />
            <InputNumber
              min={1}
              value={quantity}
              size="small"
              className="w-16"
              onChange={(value) => setQuantity(value)}
            />
            <Button
              icon={<PlusOutlined />}
              size="small"
              onClick={() => setQuantity((prev) => prev + 1)}
            />
          </div>

          <div className="text-right font-medium">
            ${(price * quantity).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className=" mt-8">
          <div className="text-right">
            <div className="flex justify-between">
              <p className="text-base font-medium">Subtotal</p>
              <p className="text-lg font-bold">${subtotal}</p>
            </div>
            <Button
              type="primary"
              block
              className="mt-4 bg-black text-white hover:bg-gray-800"
              size="large"
            >
              <Link to={`/checkout`}> Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
