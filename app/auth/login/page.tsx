"use client";
import { useAuthStore } from "@/app/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ username, password });
      router.push("/dashboard/projects");
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
          <div className="space-y-3">
            <h3 className="font-bold text-2xl">Login to SDSSN</h3>
            <p>Provide your details to login</p>
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

          <div className="mt-5 space-y-2">
            <p>
              Don’t have an account yet?{" "}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
