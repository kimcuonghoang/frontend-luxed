import React from "react";
import { Card, Statistic, Table, Tag, Button } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Doanh thu",
    dataIndex: "revenue",
    render: (value) => `${value.toLocaleString()}₫`,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status) => (
      <Tag color={status === "Bán chạy" ? "green" : "volcano"}>{status}</Tag>
    ),
  },
];

const data = [
  {
    key: "1",
    product: "Áo sơ mi LV 25SS",
    revenue: 15500000,
    status: "Bán chạy",
  },
  {
    key: "2",
    product: "Quần Jean Dsquared2 likeauth",
    revenue: 8800000,
    status: "Bình thường",
  },
  {
    key: "3",
    product: "Áo Jacket Dior 24ss ",
    revenue: 12040000,
    status: "Bán chạy",
  },
];

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thống kê tổng quan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title="Tổng doanh thu"
            value={84500000}
            precision={0}
            valueStyle={{ color: "#3f8600" }}
            prefix={<DollarOutlined />}
            suffix="₫"
          />
        </Card>
        <Card>
          <Statistic
            title="Đơn hàng hôm nay"
            value={28}
            valueStyle={{ color: "#1890ff" }}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Khách hàng mới"
            value={35}
            valueStyle={{ color: "#cf1322" }}
            prefix={<UserOutlined />}
            suffix={<ArrowUpOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Tỷ lệ hoàn đơn"
            value={4.5}
            precision={1}
            valueStyle={{ color: "#f56a00" }}
            suffix="%"
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Doanh thu theo tuần" extra={<BarChartOutlined />}>
          <div className="h-64 flex items-center justify-center text-gray-400">
            (Biểu đồ sẽ hiển thị ở đây)
          </div>
        </Card>

        <Card title="Sản phẩm bán chạy">
          <Table columns={columns} dataSource={data} pagination={false} />
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
