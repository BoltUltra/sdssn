"use client";
import React from "react";
import Image from "next/image";
import { Footer, Header } from "./components";
import Hero from "./components/Homepage/Hero";
import About from "./components/Homepage/About";
import Features from "./components/Homepage/Features";
import MembershipCount from "./components/Homepage/MembershipCount";
import SharedMap from "./components/Homepage/SharedMap";
import What from "./components/Homepage/What";
import President from "./components/Homepage/President";
import Partners from "./components/Homepage/Partners";
import Newsletter from "./components/Homepage/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <MembershipCount />
      <SharedMap />
      <What />
      {/* <President /> */}
      <Partners />
      <Newsletter />
      <Footer />
    </>
  );
}
