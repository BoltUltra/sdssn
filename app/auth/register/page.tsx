"use client";
import { useAuthStore } from "@/app/stores/authStore";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const { register } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password });
  };

  return (
    <>
      <div className="md:max-w-xl md:mx-auto mx-5 flex items-center justify-center my-32">
        <div className="shadow-md rounded-lg p-8 w-full">
          <div className="space-y-3">
            <h3 className="font-bold text-2xl">Sign up to SDSSN</h3>
            <p>Provide your details to register</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 pt-5">
            <div className="flex flex-col space-y-2 pt-5">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
                className="form-input"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="username" className="form-label">
                Username
              </label>
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
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
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

            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="form-input"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link href="/terms" className="font-bold text-primary">
                  terms and conditions
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="py-4 w-full text-white bg-primary rounded-lg mt-10"
            >
              Register
            </button>
          </form>

          <div className="mt-5">
            <p>
              Already have an account?{" "}
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

export default Register;
