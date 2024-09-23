"use client";
import Image from "next/image";
import { Footer, Header } from "../components";

export default function About() {
  return (
    <>
      <Header />
      <p className="py-32">This is about</p>
      <Footer />
    </>
  );
}
