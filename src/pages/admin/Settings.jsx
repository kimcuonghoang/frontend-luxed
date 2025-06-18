import React from "react";
import { Tabs, Form, Input, Switch, Button, message } from "antd";
import { FiUser, FiLock, FiBell, FiSave } from "react-icons/fi";

const { TabPane } = Tabs;

const Settings = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // giả lập lưu
        console.log("Saved values:", values);
        message.success("Đã lưu cài đặt!");
      })
      .catch(() => {
        message.error("Vui lòng kiểm tra lại thông tin");
      });
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FiUser />
        Cài đặt
      </h1>

      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <FiUser /> Tài khoản
            </span>
          }
          key="1"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email không hợp lệ",
                },
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Button type="primary" icon={<FiSave />} onClick={handleSave}>
              Lưu
            </Button>
          </Form>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <FiLock /> Bảo mật
            </span>
          }
          key="2"
        >
          <Form layout="vertical">
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[{ required: true, message: "Nhập mật khẩu cũ" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[{ required: true, message: "Nhập mật khẩu mới" }]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" icon={<FiSave />}>
              Đổi mật khẩu
            </Button>
          </Form>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <FiBell /> Thông báo
            </span>
          }
          key="3"
        >
          <Form layout="vertical">
            <Form.Item
              label="Nhận email khuyến mãi"
              name="emailPromo"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Thông báo đẩy"
              name="pushNoti"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Button type="primary" icon={<FiSave />}>
              Lưu thông báo
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
