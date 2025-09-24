import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getProductDetail, updateProduct } from "../../../api/productApi";

const ProductEdit = ({ productId, onClose, onSuccess }) => {
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
        const product = await getProductDetail(productId);
        reset(product);
        setLoading(false);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu sản phẩm!");
        console.error(error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct(productId, {
        ...data,
        price: parseFloat(data.price),
        countInStock: parseInt(data.countInStock),
      });
      toast.success("Cập nhật sản phẩm thành công!");
      onSuccess && onSuccess();
      onClose && onClose();
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.error(error);
    }
  };

  if (loading) return <div className="text-center">Đang tải...</div>;

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
          <label className="form-label">Ảnh </label>
          <input
            type="text"
            className="form-control"
            accept="image/*"
            {...register("image", { required: true })}
            placeholder="Nhập URL ảnh sản phẩm..."
          />
          {errors.image && (
            <span className="text-danger">Ảnh không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Giá (VNĐ)</label>
          <input
            type="number"
            className="form-control"
            {...register("price", {
              required: true,
              min: { value: 0, message: "Giá phải lớn hơn 0" },
            })}
            placeholder="Nhập giá sản phẩm..."
          />
          {errors.price && (
            <span className="text-danger">
              {errors.price.message || "Giá không được bỏ trống."}
            </span>
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

export default ProductEdit;
