"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import { logoNew } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  IoReturnDownBackOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";

const Register = () => {
  const router = useRouter();
  const { register } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { fetchSecurityQuestions } = useDataStore();
  const [securityQuestions, setSecurityQuestions] = useState<any[]>([]);
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length > 8;

    if (
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLongEnough
    ) {
      toast.error(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long."
      );
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      security_question: selectedSecurityQuestion,
      answer: securityAnswer,
    };
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(payload);
      // toast.success("Registration successful");
      setFirstName("");
      setLastName("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSelectedSecurityQuestion("");
      setSecurityAnswer("");
      router.push("/auth/verify-email");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    checkPasswordStrength();
    setIsFormValid(
      firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        name.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        selectedSecurityQuestion.trim() !== "" &&
        securityAnswer.trim() !== ""
    );
  }, [
    firstName,
    lastName,
    name,
    email,
    password,
    confirmPassword,
    selectedSecurityQuestion,
    securityAnswer,
  ]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await fetchSecurityQuestions();
        setSecurityQuestions(questions.data);
      } catch (error) {
        console.error("Error fetching security questions:", error);
      }
    };

    fetchQuestions();
  }, [fetchSecurityQuestions]);

  return (
    <>
      <Toaster />
      <div className="md:grid grid-cols-2 h-screen">
        <div className="bg-primary md:flex hidden items-center justify-center h-screen">
          <Image src={logoNew} alt="" height={300} width={300} className="" />
        </div>
        <div className="md:py-20 md:my-0 md:p-10 p-8 my-32 h-screen overflow-hidden overflow-y-scroll">
          <div className="w-full">
            <div className="space-y-3">
              <h3 className="font-bold text-2xl">Sign up to SDSSN</h3>
              <p>Provide your details to register</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 pt-5">
              <div className="flex flex-col space-y-2 pt-5">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="form-input"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <div className="flex items-center space-x-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        passwordStrength === 1
                          ? "bg-red-500 w-1/4"
                          : passwordStrength === 2
                          ? "bg-orange-500 w-1/2"
                          : passwordStrength === 3
                          ? "bg-yellow-500 w-3/4"
                          : passwordStrength === 4
                          ? "bg-green-500 w-full"
                          : passwordStrength > 4
                          ? "bg-green-500 w-full"
                          : "bg-transparent w-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {passwordStrength === 1
                      ? "Weak"
                      : passwordStrength === 2
                      ? "Fair"
                      : passwordStrength === 3
                      ? "Good"
                      : passwordStrength === 4
                      ? "Strong"
                      : ""}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="form-input relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="securityQuestion" className="form-label">
                  Security Question
                </label>
                <div className="form-input">
                  <select
                    value={selectedSecurityQuestion}
                    onChange={(e) =>
                      setSelectedSecurityQuestion(e.target.value)
                    }
                    required
                    className="bg-transparent outline-none w-full"
                  >
                    <option value="">Select a security question</option>
                    {securityQuestions?.map((question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="securityAnswer" className="form-label">
                  Security Answer
                </label>
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Your answer"
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
                className={`py-4 w-full text-white bg-primary rounded-lg mt-10 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? <div className="loader"></div> : "Register"}
              </button>
            </form>

            <div className="mt-5 space-y-2">
              <p>
                Already have an account?{" "}
                <Link href="/auth/login" className="font-bold text-primary">
                  Login
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
      </div>
    </>
  );
};

export default Register;
