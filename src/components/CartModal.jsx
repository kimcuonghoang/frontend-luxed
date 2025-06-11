import React, { useContext } from "react";
import { Modal, List, Button, Typography } from "antd";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";

const { Text } = Typography;

const CartModal = ({ visible, onClose }) => {
  const { state, dispatch } = useContext(CartContext);
  const cartItems = (state.cart || []).filter(
    (item) =>
      item &&
      typeof item.price === "number" &&
      typeof item.quantity === "number"
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleRemoveItem = (_id) => {
    dispatch({ type: "REMOVE_CART", payload: _id });
  };
  const handleDecrement = (_id) => {
    dispatch({ type: "DECREMENT", payload: _id });
  };
  const handleIncrement = (_id) => {
    dispatch({ type: "INCREMENT", payload: _id });
  };
  return (
    <Modal
      title="Giỏ hàng của bạn"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
        <Button
          key="checkout"
          type="text"
          className="bg-gray-400 text-black border-none shadow-none hover:bg-black"
        >
          Thanh toán
        </Button>,
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        locale={{ emptyText: "Giỏ hàng đang trống" }}
        renderItem={(item, index) => (
          <List.Item
            key={item._id || index}
            actions={[
              <Button
                icon={<FiTrash2 />}
                type="text"
                danger
                onClick={() => handleRemoveItem(item._id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Số lượng: ${item.quantity}`}
            />
            <Button
              icon={<FiMinus />}
              type="text"
              danger
              onClick={() => {
                if (item.quantity > 1) {
                  handleDecrement(item._id);
                }
              }}
            />

            <Text strong>
              {(item.price * item.quantity).toLocaleString()} ₫
            </Text>
            <Button
              icon={<FiPlus />}
              type="text"
              danger
              onClick={() => handleIncrement(item._id)}
            />
          </List.Item>
        )}
      />
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Text strong>Tổng cộng: </Text>
        <Text type="danger" strong style={{ fontSize: 16 }}>
          {totalPrice.toLocaleString()} ₫
        </Text>
      </div>
    </Modal>
  );
};

export default CartModal;
