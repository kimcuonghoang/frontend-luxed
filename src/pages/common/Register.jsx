import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../validations/authSchema";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await registerApi(data);
      console.log(res);
      reset();
      nav("/auth/login");
      toast.success("Register successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data || "Register failed!");
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
            <img src={img} alt="" />
          </div>
          <div className="p-5">
            <h1 className="text-6xl pb-16 font-semibold">CodeFarm</h1>
            <h3 className="text-3xl font-medium mb-7">Create Account</h3>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <div>
                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      First Name
                    </label>
                    <input
                      type="text"
                      className=" w-full border-b-2 border-gray-400"
                      {...register("username")}
                    />
                    {errors?.username && (
                      <span className="text-danger">
                        {errors.username.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      Last Name{" "}
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className=" w-full border-b-2 border-gray-400"
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className=" w-full border-b-2 border-gray-400"
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      Phone Number
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className=" w-full border-b-2 border-gray-400"
                    />
                    {errors?.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className=" w-full border-b-2 border-gray-400"
                    />
                    {errors?.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-7">
                    <label htmlFor="" className="text-[#9D9D9D]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className=" w-full border-b-2 border-gray-400"
                    />

                    {errors?.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-7 flex justify-center mt-11">
                <button className="bg-black rounded-lg px-[214px] py-2.5 text-white">
                  Create Account
                </button>
              </div>
              <div className="text-center">
                Already have an account?
                <Link className="text-blue-500" to={`/auth/login`}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
