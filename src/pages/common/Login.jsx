import React from "react";
import { Form, Input, Button, message } from "antd";
import { loginApi } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

import imgLogin from "../../assets/imgs/imgLogin.png";
import iconGoogle from "../../assets/imgs/iconGoogle.png";
import iconEmail from "../../assets/imgs/iconEmail.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await loginApi(values);
      const { token, user } = data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error("Login failed, please check your information again!");
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-white px-8 py-16">
        <div className="grid grid-cols-2 max-w-6xl w-full shadow-xl border border-gray-200">
          {/* Image Side */}
          <div className="hidden md:block">
            <img
              src={imgLogin}
              alt="Fashion Login"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form Side */}
          <div className="p-12 flex flex-col justify-center bg-white">
            <h3 className="text-2xl font-light uppercase tracking-wide mb-12 text-gray-600">
              Sign In To <span className="font-semibold">LUXE</span>
            </h3>

            {/* Social Buttons */}
            <div className="flex gap-6 mb-16">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 uppercase tracking-wide font-medium text-gray-800 hover:bg-black hover:text-white transition-all duration-300"
              >
                <img src={iconGoogle} alt="Google" className="w-5 h-5" />
                Google
              </button>

              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 uppercase tracking-wide font-medium text-gray-800 hover:bg-black hover:text-white transition-all duration-300"
              >
                <img src={iconEmail} alt="Email" className="w-5 h-5" />
                Email
              </button>
            </div>

            {/* Ant Design Form */}
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="w-full max-w-md mx-auto"
              size="large"
            >
              <Form.Item
                label={
                  <span className="uppercase text-xs tracking-wide text-gray-500">
                    Email
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Invalid email format!" },
                ]}
              >
                <Input className="rounded-none border-0 border-b border-gray-400 focus:ring-0" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="uppercase text-xs tracking-wide text-gray-500">
                    Password
                  </span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password className="rounded-none border-0 border-b border-gray-400 focus:ring-0" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full uppercase tracking-widest font-semibold bg-black hover:bg-gray-800 text-white py-3 rounded-none"
                >
                  Sign In
                </Button>
              </Form.Item>

              <div className="w-full max-w-md mx-auto flex flex-col gap-4 mt-6">
                <Link
                  to="/auth/register"
                  className="text-center uppercase tracking-wider font-semibold py-3 border border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Register Now
                </Link>

                <div className="w-full flex justify-end">
                  <Link
                    to=""
                    className="text-sm italic text-gray-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
