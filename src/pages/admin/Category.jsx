import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Modal } from "antd";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";
import {
  getAllCategory,
  deleteCategory,
  updateCategory,
} from "../../api/categoryApi";

const Category = () => {
  const [products, setProducts] = useState([]);

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
      const res = await getAllCategory();
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách category.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    if (confirm("Bạn có chắc muốn xoá category này?")) {
      try {
        await deleteCategory(id);
        toast.success("Đã xoá category thành công");
        fetchProducts();
      } catch (err) {
        toast.error("Không thể xoá category.");
      }
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      await updateCategory(product.id, {
        ...product,
        status: product.status === "available" ? "out_of_stock" : "available",
      });
      toast.success("Cập nhật trạng thái thành công!");
      fetchProducts();
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  return (
    <div className="container mt-5">
      <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
        Thêm mới danh mục
      </Button>
      <Modal
        title="Thêm danh mục"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <CategoryAdd
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchProducts}
        />
      </Modal>

      <h2 className="text-center mt-3">Danh sách danh mục</h2>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Tên danh mục</th>
            <th>Mô tả danh mục</th>
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
                <td>{item.title}</td>

                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleToggleStatus(item)}
                  >
                    Đổi trạng thái
                  </button>

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
                Không có category nào.
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
        title="Chỉnh sửa danh mục"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedProductId(null);
        }}
        footer={null}
      >
        {selectedProductId && (
          <CategoryEdit
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

export default Category;
