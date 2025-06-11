import React, { useContext, useEffect, useState } from "react";
import { getAllProduct } from "../../api/productApi";
import ImageSlider from "../../components/ImageSlider";
import ColletionHome from "../../components/ColletionHome";
import HeroSection from "../../components/HeroSection";
import { Link } from "react-router-dom";
import ServicesShop from "../../components/ServicesShop";
import DealsOfTheMonth from "../../components/DealsOfTheMonth";
import FollowUs from "../../components/FollowUs";
import { CartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Lỗi lấy sản phẩm!");
      }
    };
    fetchProduct();
  }, []);

  const setCategory = (category) => {
    console.log(category);
  };

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  return (
    <>
      <HeroSection />
      <ColletionHome />
      <DealsOfTheMonth />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            New Arrivals
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
            duis ultrices sollicitudin aliquam sem.
          </p>
        </div>
        <nav aria-label="New Arrivals categories" className="my-12">
          <ul className="flex flex-wrap gap-4 justify-center">
            {[
              { label: "Men’s Fashion", value: "all" },
              { label: "Women’s Fashion", value: "shoes" },
              { label: "Women Accessories", value: "clothing" },
              { label: "Men Accessories", value: "accessories" },
            ].map((category, index) => (
              <li
                key={index}
                className="bg-gray-100 py-2 px-6 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                <button
                  onClick={() => setCategory(category.value)}
                  className="text-sm font-medium"
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 overflow-hidden"
              aria-label={`Product: ${product.name}`}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105 "
                />
              </div>

              {/* Product Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-3 font-bold text-black dark:text-yellow-400">
                  ${product.price}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-end justify-center opacity-100 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="w-full bg-black/60 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-transform duration-200 hover:scale-105"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <FaShoppingCart />
                      Thêm vào giỏ
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 w-full bg-yellow-500 text-white py-3 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-transform duration-200 hover:scale-105"
                      aria-label={`Buy ${product.name} now`}
                    >
                      <FaBolt />
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to=""
            className="inline-block bg-gray-900 text-white font-semibold py-3 px-10 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            View More
          </Link>
        </div>
      </div>

      <ServicesShop />
      <FollowUs />
      <ImageSlider />
    </>
  );
};

export default Home;
