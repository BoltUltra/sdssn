"use client";
import Image from "next/image";
import { Footer, Header } from "../components";
import HeroSlider from "../components/Media/HeroSlider";

export default function Media() {
  return (
    <>
      <Header />
      <HeroSlider />
      <Footer />
    </>
  );
}
