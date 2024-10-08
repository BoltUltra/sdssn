"use client";
import Image from "next/image";
import { Footer, Header } from "../components";
import Form from "../components/Contact/Form";
import Info from "../components/Contact/Info";

export default function Contact() {
  return (
    <>
      <Header />
      <Form />
      <Info />
      <Footer />
    </>
  );
}
