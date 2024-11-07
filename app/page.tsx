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
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <section className="relative">
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

        <div className="socials w-16 fixed right-0 top-[40%] bg-primary/50 hover:bg-primary text-white flex flex-col items-center text-xl transitionn">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transitionn"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transitionn"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transitionn"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="h-16 w-16 flex items-center justify-center hover:bg-white hover:text-primary transitionn"
          >
            <FaInstagram />
          </Link>
        </div>
      </section>
    </>
  );
}
