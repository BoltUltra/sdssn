"use client";
import Image from "next/image";
import { Footer, Header } from "./components";

export default function Home() {
  return (
    <>
      <Header />
      <p className="py-32">This is homepage</p>
      <Footer />
    </>
  );
}
