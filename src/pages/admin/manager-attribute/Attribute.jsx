// src/pages/admin/Attribute.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Tag,
  message,
} from "antd";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../../../api/attributeApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Attribute = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const queryClient = useQueryClient();

  // Query: lấy toàn bộ attributes
  const { data: attributes, isLoading } = useQuery({
    queryKey: ["ATTRIBUTES"],
    queryFn: getAllAttribute,
  });

  // Mutation: tạo mới
  const createMutation = useMutation({
    mutationFn: createAttribute,
    onSuccess: () => {
      message.success("Thêm thuộc tính thành công");
      queryClient.invalidateQueries(["ATTRIBUTES"]);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Thêm thất bại");
    },
  });

  // Mutation: cập nhật
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAttribute(id, data),
    onSuccess: () => {
      message.success("Cập nhật thuộc tính thành công");
      queryClient.invalidateQueries(["ATTRIBUTES"]);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Cập nhật thất bại");
    },
  });

  // Mutation: xóa
  const deleteMutation = useMutation({
    mutationFn: deleteAttribute,
    onSuccess: () => {
      message.success("Xóa thuộc tính thành công");
      queryClient.invalidateQueries(["ATTRIBUTES"]);
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Xóa thất bại");
    },
  });

  const openModal = (record) => {
    if (record) {
      setEditing(record);
      form.setFieldsValue(record);
    } else {
      setEditing(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editing) {
        updateMutation.mutate({ id: editing._id, data: values });
      } else {
        createMutation.mutate(values);
      }
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: "Tên thuộc tính",
      dataIndex: "attributeName",
    },
    {
      title: "Mã code",
      dataIndex: "attributeCode",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button icon={<FiEdit />} onClick={() => openModal(record)} />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              danger
              icon={<FiTrash2 />}
              loading={deleteMutation.isPending}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<FiPlus />} onClick={() => openModal()}>
          Thêm thuộc tính
        </Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={attributes?.data || []}
        loading={isLoading}
      />

      <Modal
        title={editing ? "Chỉnh sửa thuộc tính" : "Thêm thuộc tính"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên thuộc tính"
            name="attributeName"
            rules={[
              { required: true, message: "Vui lòng nhập tên thuộc tính" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã code"
            name="attributeCode"
            rules={[{ required: true, message: "Vui lòng nhập mã code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attribute;
