"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header, Footer, Loading } from "../components";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isLoading, loadUserFromLocalStorage } =
    useAuthStore();
  const router = useRouter();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }

    if (!isLoading && isAuthenticated) {
      router.push("/dashboard/projects");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <section>{children}</section>
      </>
    );
  }

  // return (
  //   <>
  //     <Header />
  //     <section>{children}</section>
  //   </>
  // );
}
