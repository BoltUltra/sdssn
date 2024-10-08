"use client";
import Image from "next/image";
import { Footer, Header } from "../components";
import Banner from "../components/NewsAndEvents/Banner";
import EventSlider from "../components/NewsAndEvents/EventSlider";
import EventsTab from "../components/NewsAndEvents/EventsTab";

export default function NewsAndEvent() {
  return (
    <>
      <Header />
      <Banner />
      <EventSlider />
      <EventsTab />
      <Footer />
    </>
  );
}
