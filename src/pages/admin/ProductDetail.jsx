import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductDetail } from "../../api/productApi";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductDetail(id);
        setProduct(res);
      } catch (err) {
        console.error("Không thể tải chi tiết sản phẩm", err);
      }
    };
    fetchData();
  }, [id]);

  if (!product) return <div className="text-center">Đang tải...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Chi tiết sản phẩm</h2>

      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded border"
          />
        </div>
        <div className="col-md-7">
          <p>
            <strong>Tên sản phẩm:</strong> {product.name}
          </p>
          <p>
            <strong>Mô tả:</strong> {product.description}
          </p>
          <p>
            <strong>Giá:</strong>{" "}
            {product.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p>
            <strong>Danh mục:</strong> {product.category || "Chưa phân loại"}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            {product.countInStock > 0 ? (
              <span className="text-success">Còn hàng</span>
            ) : (
              <span className="text-danger">Hết hàng</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link to="/admin/product" className="btn btn-secondary">
          Quay lại danh sách
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
