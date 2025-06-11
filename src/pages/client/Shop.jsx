import React, { useEffect, useState } from "react";
import FollowUs from "../../components/FollowUs";
import ServicesShop from "../../components/ServicesShop";
import { getAllProduct } from "../../api/productApi";
import FiltersProduct from "../../components/FiltersProduct";
import { MdNavigateNext } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const colors = [
  { name: "Red", hex: "#f87171" },

  { name: "Blue", hex: "#60a5fa" },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="text-center py-20">
        <h2 className="font-bold text-4xl mb-3 ">Fashion</h2>
        <div className="flex gap-3 items-center justify-center">
          <Link to="/">Home</Link>
          <MdNavigateNext />
          <Link to="/shop">Shop</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FiltersProduct />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => nav(`/products/${product._id}`)}
                  className="group relative bg-white dark:bg-gray-800 rounded-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
                >
                  <figure className="flex justify-center items-center overflow-hidden w-full h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-110 duration-300"
                    />
                  </figure>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {product.name}
                    </h3>

                    <div className="mt-3 font-bold text-black dark:text-yellow-400">
                      ${product.price}
                    </div>
                    <div>
                      <div className="flex gap-2">
                        {colors.map((color) => (
                          <div
                            key={color.name}
                            title={color.name}
                            className={`w-6 h-6 rounded-full border cursor-pointer transition ${
                              selectedColors.includes(color.name)
                                ? "ring-2 ring-black"
                                : ""
                            }`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() =>
                              toggleItem(
                                color.name,
                                selectedColors,
                                setSelectedColors
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                    {/* <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-black hover:bg-gray-900 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Thêm vào giỏ
                </button>
                <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm font-medium">
                  Mua ngay
                </button>
              </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ServicesShop />
      <FollowUs />
    </>
  );
};

export default Shop;
