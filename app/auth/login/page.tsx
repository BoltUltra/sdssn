"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import { logoNew } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  IoReturnDownBackOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password }, router);
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  return (
    <>
      <Toaster />
      <div className="md:grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center h-screen w-full">
          <div className="w-full md:p-10 p-8">
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Login to SDSSN</h3>
              <p>Provide your details to login</p>
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="flex flex-col space-y-2 py-5 mt-5">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="form-input"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="form-input relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className={`py-4 w-full text-white bg-primary rounded-lg mt-10 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? <div className="loader"></div> : "Login"}
              </button>
            </form>

            <div className="mt-5 space-y-2">
              <p>
                Don't have an account yet?{" "}
                <Link href="/auth/register" className="font-bold text-primary">
                  Sign Up
                </Link>
              </p>
              <p>
                Forgot your password? {""}
                <Link
                  href="/auth/forgot-password"
                  className="font-bold text-primary"
                >
                  Reset
                </Link>
              </p>
              <p className="flex items-center space-x-2">
                <IoReturnDownBackOutline size={20} />
                <span>
                  go back to{"  "}
                  <Link href="/" className="font-bold text-primary">
                    homepage
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-primary md:flex hidden items-center justify-center h-screen">
          <Image src={logoNew} alt="" height={300} width={300} />
        </div>
      </div>
    </>
  );
};

export default Login;
