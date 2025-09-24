// import React, { useEffect, useState } from "react";
// import FollowUs from "../../components/FollowUs";
// import ServicesShop from "../../components/ServicesShop";
// import { getAllProduct } from "../../api/productApi";
// import FiltersProduct from "../../components/FiltersProduct";
// import { MdNavigateNext } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllVariant } from "../../api/variantApi";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [variants, setVariants] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productRes = await getAllProduct();
//         const variantRes = await getAllVariant();
//         setProducts(productRes.data.data);
//         setVariants(variantRes.data.data);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Hàm lấy các màu duy nhất của từng sản phẩm dựa trên variants
//   const getColorsByProductId = (productId) => {
//     const productVariants = variants.filter((v) => v.product._id === productId);
//     const uniqueColors = Array.from(
//       new Map(productVariants.map((v) => [v.color._id, v.color])).values()
//     );
//     return uniqueColors;
//   };

//   return (
//     <>
//       <div className="text-center py-20">
//         <h2 className="font-bold text-4xl mb-3">Fashion</h2>
//         <div className="flex gap-3 items-center justify-center">
//           <Link to="/">Home</Link>
//           <MdNavigateNext />
//           <Link to="/shop">Shop</Link>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-1">
//             <FiltersProduct />
//           </div>

//           <div className="lg:col-span-3">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {products.map((product) => {
//                 const uniqueColors = getColorsByProductId(product._id);
//                 return (
//                   <div
//                     key={product._id}
//                     onClick={() => nav(`/products/${product._id}`)}
//                     className="group relative bg-white dark:bg-gray-800 rounded-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
//                   >
//                     <figure className="flex justify-center items-center overflow-hidden w-full h-64">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="h-full w-full object-cover group-hover:scale-110 duration-300"
//                       />
//                     </figure>
//                     <div className="p-4">
//                       <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
//                         {product.name}
//                       </h3>

//                       <div className="mt-3 font-bold text-black dark:text-yellow-400">
//                         ${product.price}
//                       </div>

//                       <div className="flex gap-2 mt-2">
//                         {uniqueColors.map((color) => (
//                           <div
//                             key={color._id}
//                             title={color.name}
//                             className="w-6 h-6 rounded-full border cursor-pointer"
//                             style={{
//                               backgroundColor: color.hexCode || "#ccc",
//                             }}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       <ServicesShop />
//       <FollowUs />
//     </>
//   );
// };

// export default Shop;
import React from "react";

const Shop = () => {
  return <div>Shop</div>;
};

export default Shop;
