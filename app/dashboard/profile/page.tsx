"use client";

import { useAuthStore } from "@/app/stores/authStore";
import Image from "next/image";

export default function Profile() {
  const auth = useAuthStore();

  return (
    <main className="">
      <p>This is Profile page</p>
    </main>
  );
}
