import React from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../../api/authApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import img from "../../assets/imgs/img.png";
import iconGoogle from "../../assets/imgs/iconGoogle.png";
import iconEmail from "../../assets/imgs/iconEmail.png";
import ScrollToTop from "../../components/ScrollToTop";

const Register = () => {
  const nav = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await registerApi(values);
      console.log(res);
      nav("/auth/login");
      message.success("Registration successful!");
    } catch (error) {
      console.log(error);
      message.error("Registration failed, please check your information again");
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-white px-8 py-16">
        <div className="grid grid-cols-2 max-w-6xl w-full shadow-xl border border-gray-200">
          {/* Left image */}
          <div className="hidden md:block">
            <img
              src={img}
              alt="Fashion Register"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right form */}
          <div className="p-12 flex flex-col justify-center bg-white">
            <h3 className="text-2xl font-medium text-gray-700 mb-10">
              Create Your <span className="font-semibold">Account</span>
            </h3>

            {/* Social buttons */}
            <div className="flex gap-6 mb-12">
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
                    Full Name
                  </span>
                }
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input
                  placeholder="Enter your full name"
                  className="rounded-none border-0 border-b border-gray-400 focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="uppercase text-xs tracking-wide text-gray-500">
                    Email Address
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Invalid email format!" },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  className="rounded-none border-0 border-b border-gray-400 focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="uppercase text-xs tracking-wide text-gray-500">
                    Password
                  </span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="rounded-none border-0 border-b border-gray-400 focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="uppercase text-xs tracking-wide text-gray-500">
                    Confirm Password
                  </span>
                }
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  className="rounded-none border-0 border-b border-gray-400 focus:ring-0"
                />
              </Form.Item>
              {/* Checkbox to agree with Privacy & Terms */}
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "You must agree to the Privacy Policy & Terms."
                            )
                          ),
                  },
                ]}
              >
                <Checkbox>
                  I agree to the{" "}
                  <Link
                    to="/privacy"
                    className="text-black font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms"
                    className="text-black font-medium hover:underline"
                  >
                    Terms of Use
                  </Link>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full uppercase tracking-widest font-semibold bg-black hover:bg-gray-800 text-white py-3 rounded-none"
                >
                  Create Account
                </Button>
              </Form.Item>

              <div className="text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  className="text-black font-medium hover:underline"
                  to={`/auth/login`}
                >
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
