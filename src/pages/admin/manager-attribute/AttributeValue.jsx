// src/pages/admin/AttributeValue.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Tag,
  message,
} from "antd";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  getAllAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "../../../api/attributeValueApi";
import { getAllAttribute } from "../../../api/attributeApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AttributeValue = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const queryClient = useQueryClient();

  // Query: lấy danh sách AttributeValues
  const { data: attributeValues, isLoading } = useQuery({
    queryKey: ["ATTRIBUTE_VALUES"],
    queryFn: getAllAttributeValue,
  });

  // Query: lấy danh sách Attributes (dropdown Select)
  const { data: attributes } = useQuery({
    queryKey: ["ATTRIBUTES"],
    queryFn: getAllAttribute,
  });

  // Mutation: tạo mới
  const createMutation = useMutation({
    mutationFn: createAttributeValue,
    onSuccess: () => {
      message.success("Thêm giá trị thành công");
      queryClient.invalidateQueries(["ATTRIBUTE_VALUES"]);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Thêm thất bại");
    },
  });

  // Mutation: cập nhật
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAttributeValue(id, data),
    onSuccess: () => {
      message.success("Cập nhật giá trị thành công");
      queryClient.invalidateQueries(["ATTRIBUTE_VALUES"]);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      message.error(err.response?.data?.message || "Cập nhật thất bại");
    },
  });

  // Mutation: xóa
  const deleteMutation = useMutation({
    mutationFn: deleteAttributeValue,
    onSuccess: () => {
      message.success("Xóa giá trị thành công");
      queryClient.invalidateQueries(["ATTRIBUTE_VALUES"]);
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
      title: "Giá trị",
      dataIndex: "value",
    },
    {
      title: "Code",
      dataIndex: "valueCode",
    },
    {
      title: "Thuộc tính",
      dataIndex: "attributeId",
      render: (id, record) => record.attributeId?.attributeName || "-",
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
          Thêm giá trị
        </Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={attributeValues?.data || []}
        loading={isLoading}
      />

      <Modal
        title={editing ? "Chỉnh sửa giá trị" : "Thêm giá trị"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Giá trị"
            name="value"
            rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="valueCode"
            rules={[{ required: true, message: "Vui lòng nhập code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thuộc tính"
            name="attributeId"
            rules={[{ required: true, message: "Vui lòng chọn thuộc tính" }]}
          >
            <Select loading={!attributes} placeholder="Chọn thuộc tính">
              {attributes?.data?.map((attr) => (
                <Select.Option key={attr._id} value={attr._id}>
                  {attr.attributeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AttributeValue;
