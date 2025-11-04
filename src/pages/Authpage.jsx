import React, { useState, useEffect } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp, Signin } from "../services/services";
import { toast } from "react-toastify";
import { setCurrentAccessToken } from "../services/axiosClient";
import logo from "../assets/airesumelogo1.png";

export default function FlipAuthCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(location.pathname !== "/signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname !== "/signup");
  }, [location.pathname]);

  const toggleSide = () => {
    navigate(isLogin ? "/signup" : "/login");
  };

  // LOGIN FORMIK
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Min 6 chars")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const payLoad = { email: values.email, password: values.password };
      Signin(payLoad)
        .then((res) => {
          const token = res?.data?.data?.accessToken;
          setCurrentAccessToken(token);
          toast.success(res?.data?.msg || "Logged in successfully!");
          window.location.href = "/resume-builder";
        })
        .catch((err) =>
          toast.error(err?.response?.data?.msg || "Login failed")
        );
    },
  });

  // SIGNUP FORMIK
  const signupFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(2).required("Full name is required"),
      email: Yup.string().email().required(),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required(),
      password: Yup.string().min(6).required(),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required(),
    }),
    onSubmit: (values) => {
      const payload = {
        userName: values.fullName,
        phoneNumber: values.phone,
        email: values.email,
        password: values.password,
      };
      signUp(payload)
        .then((res) => {
          toast.success(res?.data?.msg || "Signed up successfully!");
          navigate("/login");
        })
        .catch((err) =>
          toast.error(err?.response?.data?.msg || "Signup failed")
        );
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-200 to-blue-400 rounded-full blur-3xl opacity-30 top-[-50px] left-[-50px]" />
      <div className="absolute w-80 h-80 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full blur-3xl opacity-30 bottom-[-60px] right-[-60px]" />

      {/* CRAZY HEADER BADGE */}

      <div className="relative w-[400px] h-[580px] perspective z-10">
        <div
          className={`relative w-full h-full duration-700 transform-style-preserve-3d ${
            isLogin ? "" : "rotate-y-180"
          }`}
        >
          {/* ===== LOGIN SIDE ===== */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-200 backface-hidden flex flex-col justify-center px-10 py-8">
            <div className="flex flex-col items-center mb-6">
              <img
                src={logo}
                alt="App Logo"
                className=" h-20 mb-3 object-contain"
              />
              <h2 className="text-2xl font-bold text-slate-800 tracking-wide">
                Welcome Back 👋
              </h2>
              <p className="text-sm text-slate-500">
                Log in to continue your journey
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={loginFormik.handleSubmit}
            >
              {/* Email */}
              <div className="relative">
                {/* <AiOutlineMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="auth-input-white pl-11"
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  value={loginFormik.values.email}
                />
              </div>
              {loginFormik.touched.email && loginFormik.errors.email && (
                <p className="text-red-500 text-sm">
                  {loginFormik.errors.email}
                </p>
              )}

              {/* Password */}
              <div className="relative">
                {/* <RiLockPasswordLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="auth-input-white pl-11 pr-10"
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  value={loginFormik.values.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p className="text-red-500 text-sm">
                  {loginFormik.errors.password}
                </p>
              )}

              <button
                type="submit"
                className="mt-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition"
              >
                Log In
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-slate-600">
              No account yet?{" "}
              <span
                onClick={toggleSide}
                className="cursor-pointer font-semibold text-blue-600 hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>

          {/* ===== SIGNUP SIDE ===== */}
          <div className="absolute w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-200 backface-hidden rotate-y-180 flex flex-col justify-center px-10 py-8 ">
            <div className="flex flex-col items-center mb-6">
              <img
                src={logo}
                alt="App Logo"
                className=" h-20 mb-3 object-contain"
              />
              <h2 className="text-2xl font-bold text-slate-800">
                Create Account 📝
              </h2>
              <p className="text-sm text-slate-500">
                Start crafting your smart resume
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={signupFormik.handleSubmit}
            >
              {/* Full Name */}
              <div className="relative">
                {/* <AiOutlineUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="auth-input-white pl-11"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.fullName}
                />
              </div>
              {signupFormik.touched.fullName &&
                signupFormik.errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {signupFormik.errors.fullName}
                  </p>
                )}

              {/* Email */}
              <div className="relative">
                {/* <AiOutlineMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="auth-input-white pl-11"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.email}
                />
              </div>
              {signupFormik.touched.email && signupFormik.errors.email && (
                <p className="text-red-500 text-sm">
                  {signupFormik.errors.email}
                </p>
              )}

              {/* Phone */}
              <div className="relative">
                {/* <AiOutlinePhone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="auth-input-white pl-11"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.phone}
                />
              </div>
              {signupFormik.touched.phone && signupFormik.errors.phone && (
                <p className="text-red-500 text-sm">
                  {signupFormik.errors.phone}
                </p>
              )}

              {/* Password */}
              <div className="relative">
                {/* <RiLockPasswordLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="auth-input-white pl-11 pr-10"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.password}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {signupFormik.touched.password &&
                signupFormik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {signupFormik.errors.password}
                  </p>
                )}

              {/* Confirm Password */}
              <div className="relative">
                {/* <RiLockPasswordLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                /> */}
                <input
                  type={showCPassword ? "text" : "password"}
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="auth-input-white pl-11"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.cpassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowCPassword((prev) => !prev)}
                  aria-label={
                    showCPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showCPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {signupFormik.touched.cpassword &&
                signupFormik.errors.cpassword && (
                  <p className="text-red-500 text-sm">
                    {signupFormik.errors.cpassword}
                  </p>
                )}

              <button
                type="submit"
                className="mt-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-slate-600">
              Already have an account?{" "}
              <span
                onClick={toggleSide}
                className="cursor-pointer font-semibold text-blue-600 hover:underline"
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
