"use client";
import Button from "@/app/components/Button";
import { logoNew } from "@/public/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { RiMailCloseFill } from "react-icons/ri";

const EmailNotVerified = () => {
  const router = useRouter();
  const email = "boltultra144@gmail.com";

  const goToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <Toaster />
      <div className="md:grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center h-screen w-full">
          <div className="w-full md:p-10 p-8">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center">
                <RiMailCloseFill size={60} />{" "}
              </div>

              <h3 className="text-3xl font-bold">Email Not Verified</h3>
              <p className="md:px-32 py-5">
                Please check your email for the verification message.
              </p>

              <Button
                text="Proceed to Login"
                onClick={goToLogin}
                className="mx-auto"
              />
              <br />
              <hr />
              <br />
              <p>
                If you did not get the email{" "}
                <span className="underline text-primary font-bold">
                  Resend Confirmation mail
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

export default EmailNotVerified;
