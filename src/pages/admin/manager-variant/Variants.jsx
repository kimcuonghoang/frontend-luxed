// src/pages/admin/Variants.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
  message,
  Tag,
  Select,
} from "antd";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../../../api/variantApi";
import { getAllAttribute } from "../../../api/attributeApi";
import { getAttributeValueByProductId } from "../../../api/attributeValueApi";

const Variants = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);

  // fetch variants
  const fetchVariants = async () => {
    try {
      setLoading(true);
      const res = await getAllVariants();
      setVariants(res.data || res);
    } catch (err) {
      message.error("Lỗi khi tải danh sách biến thể");
    } finally {
      setLoading(false);
    }
  };

  // fetch attributes
  const fetchAttributes = async () => {
    try {
      const res = await getAllAttribute();
      setAttributes(res.data || res);
    } catch (err) {
      message.error("Lỗi khi tải attributes");
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchAttributes();
  }, []);

  const handleAttributeChange = async (attributeId) => {
    try {
      const res = await getAttributeValueByProductId(attributeId);
      setAttributeValues(res.data || res);
      form.setFieldValue("attributeValueId", undefined);
    } catch (err) {
      message.error("Lỗi khi tải giá trị thuộc tính");
    }
  };

  const openModal = (record) => {
    if (record) {
      setEditing(record);
      form.setFieldsValue(record);
      if (record.attributeId) {
        handleAttributeChange(record.attributeId);
      }
    } else {
      setEditing(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await updateVariant(editing._id, values);
        message.success("Cập nhật biến thể thành công");
      } else {
        await createVariant(values);
        message.success("Tạo biến thể thành công");
      }
      fetchVariants();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      message.error("Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariant(id);
      message.success("Xóa biến thể thành công");
      fetchVariants();
    } catch (err) {
      message.error("Xóa thất bại");
    }
  };

  const columns = [
    {
      title: "Tên biến thể",
      dataIndex: "variantName",
    },
    {
      title: "Thuộc tính",
      dataIndex: "attributeName",
      render: (val) => <Tag color="geekblue">{val}</Tag>,
    },
    {
      title: "Giá trị",
      dataIndex: "attributeValueName",
      render: (val) => <Tag color="purple">{val}</Tag>,
    },
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (val) => <Tag color="blue">{val.toLocaleString()} đ</Tag>,
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button icon={<FiEdit />} onClick={() => openModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<FiTrash2 />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<FiPlus />}
          onClick={() => openModal(null)}
        >
          Thêm biến thể
        </Button>
      </Space>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={variants}
        loading={loading}
      />

      {/* Modal thêm/sửa */}
      <Modal
        title={editing ? "Sửa biến thể" : "Thêm biến thể"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Tên biến thể"
            name="variantName"
            rules={[{ required: true, message: "Nhập tên biến thể" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thuộc tính"
            name="attributeId"
            rules={[{ required: true, message: "Chọn thuộc tính" }]}
          >
            <Select
              placeholder="Chọn thuộc tính"
              onChange={handleAttributeChange}
            >
              {attributes.map((attr) => (
                <Select.Option key={attr._id} value={attr._id}>
                  {attr.attributeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá trị"
            name="attributeValueId"
            rules={[{ required: true, message: "Chọn giá trị" }]}
          >
            <Select placeholder="Chọn giá trị">
              {attributeValues.map((val) => (
                <Select.Option key={val._id} value={val._id}>
                  {val.valueName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: "Nhập SKU" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Nhập giá" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="stock"
            rules={[{ required: true, message: "Nhập số lượng" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Variants;
