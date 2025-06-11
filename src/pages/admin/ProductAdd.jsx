// ======= FRONTEND: React Component =======

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct } from "./../../api/productApi";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demo_shop_upload");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/domwov7kq/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.secure_url) throw new Error("Upload ảnh thất bại");
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      const file = data.image[0];
      const imageUrl = await uploadToCloudinary(file);

      const newProduct = {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category || "",
        countInStock: parseInt(data.countInStock) || 0,
        image: imageUrl,
      };

      await createProduct(newProduct);
      toast.success("Tạo sản phẩm thành công!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi tạo sản phẩm.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            placeholder="Nhập tên sản phẩm..."
          />
          {errors.name && (
            <span className="text-danger">Tên không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Ảnh sản phẩm</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-danger">Vui lòng chọn ảnh sản phẩm.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá (VNĐ)</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, min: 0 })}
            placeholder="Nhập giá sản phẩm..."
          />
          {errors.price && (
            <span className="text-danger">Giá không hợp lệ.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows="3"
            {...register("description", { required: true })}
            placeholder="Nhập mô tả sản phẩm..."
          ></textarea>
          {errors.description && (
            <span className="text-danger">Mô tả không được bỏ trống.</span>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-4 me-2 rounded-pill"
          >
            Tạo sản phẩm
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4 rounded-pill"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
