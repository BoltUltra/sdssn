"use client";
import { useAuthStore } from "@/app/stores/authStore";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
  const { reset } = useAuthStore();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reset({ email });
  };

  return (
    <>
      <div className="md:max-w-xl md:mx-auto mx-5 flex items-center justify-center my-32">
        <div className="shadow-md rounded-lg p-8 w-full">
          <div className="space-y-3">
            <h3 className="font-bold text-2xl mb-3">Forget Password?</h3>
            <p>
              Enter your email address. You will receive instruction on how to
              reset your password
            </p>
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col space-y-2 mt-5">
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

            <button
              type="submit"
              className="py-4 w-full text-white bg-primary rounded-lg mt-10"
            >
              Reset Password
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
              Remember password? {""}
              <Link href="/auth/login" className="font-bold text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
