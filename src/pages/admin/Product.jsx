import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../../api/productApi";
import { Button, message, Modal } from "antd";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProduct({
        keyword,
        category: categoryFilter,
        sortBy,
        order,
        page,
        limit,
      });
      setProducts(res.data.data || []);
    } catch (err) {
      message.error("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword, categoryFilter, sortBy, order, page]);

  const handleDelete = async (id) => {
    console.log(id);
    if (confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
      try {
        await deleteProduct(id);
        message.success("Đã xoá sản phẩm thành công");
        fetchProducts();
      } catch (err) {
        message.error("Không thể xoá sản phẩm.");
      }
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      await updateProduct(product.id, {
        ...product,
        status: product.status === "available" ? "out_of_stock" : "available",
      });
      message.success("Cập nhật trạng thái thành công!");
      fetchProducts();
    } catch (err) {
      message.error("Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  return (
    <div className="container mt-5">
      <Button
        className="bg-black mb-4 "
        type="primary"
        onClick={() => setIsAddModalOpen(true)}
      >
        Thêm mới sản phẩm
      </Button>
      <Modal
        title="Thêm sản phẩm"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <ProductAdd
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchProducts}
        />
      </Modal>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm..."
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">-- Lọc theo danh mục --</option>
            <option value="shirt">Áo</option>
            <option value="shoes">Giày</option>
            <option value="accessory">Phụ kiện</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => {
              const [s, o] = e.target.value.split("-");
              setSortBy(s);
              setOrder(o);
            }}
          >
            <option value="">-- Sắp xếp --</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="createdAt-desc">Mới nhất</option>
            <option value="createdAt-asc">Cũ nhất</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {typeof item.price === "number"
                    ? item.price.toLocaleString() + " VNĐ"
                    : "Đang cập nhật"}
                </td>

                <td>
                  {item.status === "available" ? (
                    <span className="text-success">Còn hàng</span>
                  ) : (
                    <span className="text-danger">Hết hàng</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleToggleStatus(item)}
                  >
                    Đổi trạng thái
                  </button>
                  <Link
                    to={`${item._id}`}
                    className="btn btn-sm btn-secondary me-1"
                  >
                    Chi tiết
                  </Link>
                  <Button
                    type="primary"
                    className="me-1"
                    onClick={() => {
                      setSelectedProductId(item._id);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-center">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Trang trước
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Trang sau
        </button>
      </div>

      <Modal
        title="Chỉnh sửa sản phẩm"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedProductId(null);
        }}
        footer={null}
      >
        {selectedProductId && (
          <ProductEdit
            // productId={product._id}
            productId={selectedProductId}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedProductId(null);
            }}
            onSuccess={fetchProducts}
          />
        )}
      </Modal>
    </div>
  );
};

export default Product;
