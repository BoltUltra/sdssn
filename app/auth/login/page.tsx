"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import { logoNew } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Perform login
      await login({ email, password }, router);

      // Verify the `currentUser` data is in localStorage before proceeding
      // const currentUser = JSON.parse(
      //   localStorage.getItem("currentUser") || "{}"
      // );

      // // Redirect based on `email_verified` only after confirming the `currentUser` data is present
      // if (currentUser && currentUser.email_verified === "1") {
      //   console.log("Email verified - routing to dashboard");
      //   router.push("/dashboard/projects");
      // } else if (currentUser && currentUser.email_verified === "0") {
      //   toast.error("Email not verified");
      //   console.log("Email not verified - routing to email verification page");
      //   router.push("/auth/email-not-verified");
      // } else {
      //   toast.error("Failed to verify email status");
      // }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="bg-primary md:flex hidden items-center justify-center h-screen">
          <Image src={logoNew} alt="" height={300} width={300} />
        </div>
      </div>
    </>
  );
};

export default Login;
