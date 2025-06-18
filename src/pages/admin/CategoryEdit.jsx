import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCategoryDetail, updateCategory } from "../../api/categoryApi";
import { message } from "antd";

const CategoryEdit = ({ productId, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getCategoryDetail(productId);
        reset(product);
        setLoading(false);
      } catch (error) {
        message.error("Lỗi khi tải dữ liệu danh mục!");
        console.error(error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId, reset]);

  const onSubmit = async (data) => {
    try {
      await updateCategory(productId, {
        ...data,
        price: parseFloat(data.price),
        countInStock: parseInt(data.countInStock),
      });
      message.success("Cập nhật danh mục thành công!");
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (error) {
      message.error("Cập nhật thất bại!");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center">Đang tải...</div>;

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
            placeholder="Nhập tên danh mục..."
          />
          {errors.title && (
            <span className="text-danger">Tên không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows="3"
            {...register("description", { required: true })}
            placeholder="Nhập mô tả danh mục..."
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
            Lưu thay đổi
          </button>
          {/* <button
            type="button"
            className="btn btn-secondary  px-4 rounded-pill"
            onClick={onClose}
          >
            Huỷ
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit;
