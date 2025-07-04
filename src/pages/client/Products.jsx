import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import imgCart from "../../assets/imgs/Cards.png";
import { getAllVariant } from "../../api/variantApi";

export default function Products() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const dataVariants = await getAllVariant();
        setProduct(res.data.data);
        setVariants(dataVariants.data.data);
        setSelectedImage(res.data.data.image || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  // Lọc biến thể của sản phẩm hiện tại
  const productVariants = variants.filter((v) => v.product._id === product._id);

  // Rút gọn danh sách size và color từ biến thể
  const uniqueSizes = Array.from(
    new Map(productVariants.map((v) => [v.size._id, v.size])).values()
  );
  const uniqueColors = Array.from(
    new Map(productVariants.map((v) => [v.color._id, v.color])).values()
  );
 const selectedVariant = productVariants.find(
    (v) =>
      selectedSize?._id === v.size._id && selectedColor?._id === v.color._id
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {[product.image].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className={`w-16 h-20 object-cover cursor-pointer rounded border ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="flex-1">
            {[product.image].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Selected"
                className={`w-full h-[500px] object-cover rounded ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm uppercase text-gray-500">CodeFarm</h2>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="text-sm text-gray-500">(3)</span>
            </div>
          </div>

          <div>
            <span className="text-2xl font-bold text-black">
              ${product.price}
            </span>
            <span className="ml-3 text-gray-500 line-through">
              ${product.price}
            </span>
            <span className="ml-2 text-red-500 bg-red-100 px-2 py-0.5 text-sm rounded">
              SAVE 35%
            </span>
          </div>

          <div className="text-gray-600 text-sm flex items-center gap-2">
            👁 24 people are viewing this right now
          </div>

          <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-600 font-medium">
            Hurry up! Sale ends in:{" "}
            <span className="font-bold">00 : 05 : 59 : 47</span>
          </div>

          {selectedVariant && (
            <div className="text-red-500 text-sm">
              Only{" "}
              <span className="font-bold">{selectedVariant.stock} item(s)</span>{" "}
              left in stock!
            </div>
          )}
          {/* Size Selection */}
          <div>
            <h4 className="font-semibold mb-1">
              Size: {selectedSize?.name || "Chưa chọn"}
            </h4>
            <div className="flex gap-2">
              {uniqueSizes.map((size) => (
                <button
                  key={size._id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize?._id === size._id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h4 className="font-semibold mb-1">
              Color: {selectedColor?.name || "Chưa chọn"}
            </h4>
            <div className="flex gap-3">
              {uniqueColors.map((color) => (
                <div
                  key={color._id}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    selectedColor?._id === color._id ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.hexCode || "#ccc" }}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h4 className="font-semibold mb-1">Quantity</h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 border rounded text-lg"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 border rounded text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-black text-white py-3 rounded font-medium">
              Add to cart
            </button>
          </div>

          <div className="flex items-center gap-6 text-sm mt-4">
            <span className="cursor-pointer hover:underline">⇄ Compare</span>
            <span className="cursor-pointer hover:underline">
              ❓ Ask a question
            </span>
            <span className="cursor-pointer hover:underline">🔗 Share</span>
          </div>

          <div className="text-sm text-gray-600 space-y-1 mt-4">
            <p>
              🚚 <strong>Estimated Delivery:</strong> Jul 30 – Aug 03
            </p>
            <p>
              ✅ <strong>Free Shipping & Returns:</strong> On all orders over
              $75
            </p>
          </div>

          <div className="border rounded p-4 text-center mt-4">
            <img src={imgCart} alt="cards" className="mx-auto mb-2 h-6" />
            <p className="text-sm font-medium text-gray-600">
              Guarantee safe & secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
