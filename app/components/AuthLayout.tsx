"use client";
import { useAuthStore } from "@/app/stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/auth/login"); // Change this to your login page route
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show a loading state or return null
  if (!isAuthenticated) {
    return <p>Loading...</p>; // You can customize this as needed
  }

  return (
    <main lang="en">
      <body>{children}</body>
    </main>
  );
}
