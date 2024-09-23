"use client";
import { useAuthStore } from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { adminLogin } = useAuthStore();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminLogin({ username, password });
      router.push("/admin/dashboard/uploads");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
    // login({ email, password });
    // login({ username, password });
  };

  return (
    <>
      <div className="md:max-w-xl md:mx-auto mx-5 flex items-center justify-center my-32">
        <div className="shadow-md rounded-lg p-8 w-full">
          <div className="space-y-3 text-center">
            <h3 className="font-bold text-2xl">Admin Login to SDSSN</h3>
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col space-y-2 py-5 mt-5">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              {/* <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="form-input"
              /> */}
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="form-input"
              />
            </div>
            <button
              type="submit"
              className={`py-4 w-full text-white bg-primary rounded-lg mt-10 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
