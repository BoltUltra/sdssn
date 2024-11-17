'use client';
import Button from '@/app/components/Button';
import { useAuthStore } from '@/app/stores/authStore';
import { useDataStore } from '@/app/stores/dataStore';
import { logoNew } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaUnlockKeyhole } from 'react-icons/fa6';
import { RiMailCheckFill } from 'react-icons/ri';

const VerifyEmail = () => {
  const router = useRouter();
  const email = 'boltultra144@gmail.com';

  const goToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <Toaster />
      <div className="md:grid grid-cols-2 h-screen">
        <div className="flex items-center justify-center h-screen w-full">
          <div className="w-full md:p-10 p-8">
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center">
                <RiMailCheckFill size={60} />
              </div>

              <h3 className="text-3xl font-bold">Email Confirmation</h3>
              <p className="md:px-32 py-5">
                We have sent an email to your email to confirm the validity of
                your email address. After receiving the email, click the link to
                verify your email address.
              </p>

              <Button
                text="Back to Login"
                onClick={goToLogin}
                className="mx-auto"
              />
              <hr />
              <p>
                If you did not get the email{' '}
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

export default VerifyEmail;
