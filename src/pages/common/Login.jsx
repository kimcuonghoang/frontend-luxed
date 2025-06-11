import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { loginSchema } from "../../validations/authSchema";
import { toast } from "react-toastify";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (dataForm) => {
    try {
      const { data } = await loginApi(dataForm);
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      reset();
      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || "Login failed!");
      reset();
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className=" m-16  ">
        <div className="grid grid-cols-2 border-solid border-2 border-gray-300">
          <div>
            <img src={imgLogin} alt="" />
          </div>
          <div className="p-5">
            <h1 className="text-6xl pb-16 font-semibold">CodeFarm</h1>
            <h3 className="text-3xl font-medium mb-7">
              Sign In To <span className="font-semibold">CodeFarm</span>
            </h3>
            <div className="flex gap-16 mb-20">
              <button
                type="button"
                className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all"
              >
                <img src={iconGoogle} alt="Google" className="w-6 h-6" />
                <span className="text-base font-medium text-gray-700">
                  Sign up with Google
                </span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-all"
              >
                <img src={iconEmail} alt="Google" className="w-6 h-6" />
                <span className="text-base font-medium text-gray-700">
                  Sign up with Email
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#9D9D9D] mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#9D9D9D] mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors?.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full max-w-md bg-black text-white font-medium py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
                >
                  Sign In
                </button>
              </div>

              <div className="w-full max-w-md mx-auto flex flex-col gap-2">
                <Link
                  to="/auth/register"
                  className="text-center text-blue-600 font-medium py-3 rounded-lg border-2 border-blue-500 bg-white hover:bg-blue-50 transition-all duration-200"
                >
                  Register Now
                </Link>

                <div className="w-full flex justify-end">
                  <Link
                    to=""
                    className="text-[#5B86E5] text-sm hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
