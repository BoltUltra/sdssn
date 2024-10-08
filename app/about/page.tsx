"use client";
import React from "react";
import Image from "next/image";
import { Footer, Header } from "../components";
import Hero from "../components/About/Hero";
import MissionAndVision from "../components/About/MissionAndVision";
import Why from "../components/About/Why";
import TeamMembers from "../components/About/TeamMembers";
import Partner from "../components/About/Partner";

export default function About() {
  return (
    <>
      <Header />
      <Hero />
      <MissionAndVision />
      <Why />
      <TeamMembers />
      <Partner />
      <Footer />
    </>
  );
}
