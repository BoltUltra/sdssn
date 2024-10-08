"use client";
import Image from "next/image";
import { Footer, Header } from "../components";
import Heading3 from "../components/Heading3";

export default function CommunityGuidelines() {
  return (
    <>
      <Header />
      <section className="pt-44 pb-20 bg-background ">
        <div className="max-w-[1440px] mx-auto md:px-20 px-5">
          <div className="mb-20 space-y-2">
            <Heading3 text={"Community Guidelines"} />
            <p>Last updated by Daniel John</p>
            <p>18-08-2024</p>
          </div>
          <div className="mt-20 space-y-5 text-lg">
            <p>
              The Spatial Data Science Society of Nigeria (SDSSN) encourages a
              respectful, collaborative, and inclusive community where members
              engage constructively in all activities, discussions, and
              projects.
            </p>
            <p>
              All members are expected to foster a positive environment by
              promoting knowledge-sharing, innovation, and mutual respect.
              Discrimination, harassment, or any form of offensive behavior
              based on race, gender, ethnicity, religion, or background will not
              be tolerated. Members should engage in open, professional
              dialogue, respecting differing viewpoints, and contributing to the
              advancement of geospatial technologies and data science in a
              meaningful way. All members are also expected to comply with
              society’s standards of integrity, professionalism, and ethical
              conduct in all interactions and projects. Violation of these
              guidelines may result in disciplinary action, including removal
              from the community.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
