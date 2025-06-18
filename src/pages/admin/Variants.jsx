import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Tag,
  Space,
  Popconfirm,
  message,
} from "antd";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { getAllProduct } from "../../api/productApi";
import {
  createVariant,
  deleteVariant,
  getAllVariant,
  updateVariant,
} from "../../api/variantApi";
import { getAllColor } from "../../api/colorApi";
import { getAllSize } from "../../api/sizeApi";

import { Link } from "react-router-dom";

const Variants = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
 
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [variantRes, productRes, colorRes, sizeRes] = await Promise.all([
        getAllVariant(),
        getAllProduct(),
        getAllColor(),
        getAllSize(),
      ]);
      setVariants(variantRes.data.data);
      setProducts(productRes.data.data);
      setColors(colorRes.data.data);
      setSizes(sizeRes.data.data);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openModal = (record = null) => {
    setEditing(record);
    form.resetFields();
    if (record) {
      form.setFieldsValue({
        ...record,
        product: record.product?._id,
        color: record.color?._id,
        size: record.size?._id,
      });
    }
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariant(id);
      message.success("Đã xóa");
      fetchAll();
    } catch {
      message.error("Lỗi khi xóa");
    }
  };

  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editing) {
          await updateVariant(values);
          message.success("Cập nhật thành công");
        } else {
          await createVariant(values);
          message.success("Tạo mới thành công");
        }
        setModalOpen(false);
        fetchAll();
      } catch {
        message.error("Lỗi khi lưu");
      }
    });
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
      key: "product",
      render: (value) => value,
    },
    {
      title: "Màu sắc",
      dataIndex: ["color", "name"],
      key: "color",
      render: (value) => <Tag color="blue">{value || "Không rõ"}</Tag>,
    },
    {
      title: "Kích cỡ",
      dataIndex: ["size", "name"],
      key: "size",
      render: (value) => <Tag color="green">{value || "Không rõ"}</Tag>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => value?.toLocaleString("vi-VN") + "₫",
    },
    {
      title: "Giá cũ",
      dataIndex: "oldPrice",
      key: "oldPrice",
      render: (value) => (value ? value.toLocaleString("vi-VN") + "₫" : "-"),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Đã bán",
      dataIndex: "soldCount",
      key: "soldCount",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (sku) => <Tag color="purple">{sku || "Không có"}</Tag>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<FiEdit />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<FiTrash2 />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Quản lý Biến thể</h1>
        <div className="flex gap-2 items-center">
          <Link
            to="/admin/variants-value"
            className="bg-black text-white py-2 px-2 rounded-md flex items-center gap-1"
          >
            <FiPlus />
            Thêm value
          </Link>
          <Button
            className="bg-black"
            type="primary"
            icon={<FiPlus />}
            onClick={() => openModal()}
          >
            Thêm biến thể
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={variants}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={editing ? "Chỉnh sửa Biến thể" : "Thêm Biến thể"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        okText={editing ? "Lưu" : "Thêm"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="product"
            label="Sản phẩm"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn sản phẩm"
              options={products.map((p) => ({
                value: p._id,
                label: p.name,
              }))}
            />
          </Form.Item>

          <Form.Item name="color" label="Màu sắc" rules={[{ required: true }]}>
            <Select
              //   mode="multiple"
              placeholder="Chọn màu"
              options={colors.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
            />
          </Form.Item>

          <Form.Item name="size" label="Kích cỡ" rules={[{ required: true }]}>
            <Select
              //   mode="multiple"
              placeholder="Chọn kích cỡ"
              options={sizes.map((s) => ({
                value: s._id,
                label: s.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá bán"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              className="w-full"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              addonAfter="₫"
            />
          </Form.Item>

          <Form.Item name="oldPrice" label="Giá cũ">
            <InputNumber
              className="w-full"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              addonAfter="₫"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Tồn kho"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item name="sku" label="Mã SKU">
            <Input placeholder="SKU nếu có" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Variants;
