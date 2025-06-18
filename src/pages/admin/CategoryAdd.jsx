import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCategory } from "../../api/categoryApi";
import { message } from "antd";

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newCategory = {
        title: data.title,
        description: data.description,
      };

      await createCategory(newCategory);
      message.success("Tạo danh mục thành công!");
      reset();
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra khi tạo danh mục.");
    }
  };

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
            Tạo danh mục
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

export default CategoryAdd;
