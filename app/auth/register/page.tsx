"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import { logoNew } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  const handleSubmit = async (e: React.FormEvent) => {
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
      setTimeout(() => {
        router.push("/auth/verify-email");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
                    {securityQuestions?.map((question) => (
                      <option key={question} value={question}>
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
                disabled={isLoading}
              >
                {isLoading ? <div className="loader"></div> : "Register"}
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
      </div>
    </>
  );
};

export default Register;
