import React, { useEffect, useState } from "react";
import { Table, Spin, message } from "antd";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch (err) {
      message.error("Lỗi khi tải dữ liệu người dùng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { title: "Website", dataIndex: "website", key: "website" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Danh sách người dùng
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin tip="Đang tải..." />
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default User;
