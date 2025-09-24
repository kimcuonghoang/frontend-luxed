import React from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";

const VariantValue = () => {
  const onSubmitColor = async (data) => {
    try {
      const newColor = {
        name: data.name,
        hexCode: data.hexCode,
      };
      await createColor(newColor);
      message.success("Tạo màu thành công!");
      resetColor();
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra khi tạo màu.");
    }
  };

  const onSubmitSize = async (data) => {
    try {
      const newSize = { name: data.name };
      await createSize(newSize);
      message.success("Tạo kích thước thành công!");
      resetSize();
    } catch (err) {
      console.error(err);
      message.error("Có lỗi xảy ra khi tạo kích thước.");
    }
  };

  return (
    <div className="container mt-5 grid grid-cols-2 gap-5">
      {/* Form tạo màu */}
      <form onSubmit={handleSubmitColor(onSubmitColor)}>
        <h4 className="mb-3 text-xl font-semibold">Tạo màu sắc</h4>
        <div className="mb-3">
          <label className="form-label">Tên màu</label>
          <input
            type="text"
            className="form-control"
            {...registerColor("name", { required: true })}
            placeholder="Nhập tên màu sắc..."
          />
          {errorsColor.name && (
            <span className="text-danger">Tên màu không được bỏ trống.</span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Mã màu</label>
          <input
            type="text"
            className="form-control"
            {...registerColor("hexCode", { required: true })}
            placeholder="Nhập mã màu (VD: #ffffff)..."
          />
          {errorsColor.hexCode && (
            <span className="text-danger">Vui lòng nhập mã màu.</span>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-4 me-2 rounded-pill"
          >
            Tạo màu
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4 rounded-pill"
            onClick={resetColor}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Form tạo kích thước */}
      <form onSubmit={handleSubmitSize(onSubmitSize)}>
        <h4 className="mb-3 text-xl font-semibold">Tạo kích thước</h4>
        <div className="mb-3">
          <label className="form-label">Tên kích thước</label>
          <input
            type="text"
            className="form-control"
            {...registerSize("name", { required: true })}
            placeholder="Nhập tên kích thước..."
          />
          {errorsSize.name && (
            <span className="text-danger">Kích thước không được bỏ trống.</span>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-4 me-2 rounded-pill"
          >
            Tạo kích thước
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4 rounded-pill"
            onClick={resetSize}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default VariantValue;
