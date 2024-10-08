import { mission, vector } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading4 from "../Heading4";

const MissionAndVision = () => {
  return (
    <section className="">
      <div className="section-container space-y-20">
        <div className="flex md:flex-row flex-col items-center md:space-x-8 md:space-y-0 space-y-8 w-full">
          <div className="md:w-[30%] md:block hidden">
            <Image src={mission} alt="mission and vision" />
          </div>
          <div className="md:w-[70%] flex flex-col md:space-y-14 space-y-10">
            <div className="flex">
              <h2 className="md:text-[70px] text-4xl font-bold relative flex">
                <span className="z-10">Our Vision</span>
                <span className="absolute h-3 md:w-[24rem] mx-auto w-full bg-[#FFCFD2] left-0 md:-bottom-3 bottom-0"></span>
              </h2>
            </div>
            <p className="md:leading-loose leading-loose md:text-lg text-justify">
              To be a leading force in driving innovation, fostering
              knowledge-sharing, and advancing sustainable solutions through the
              strategic application of geospatial technologies. SDSSN aims to
              empower individuals, organizations, and communities by leveraging
              spatial data science to address societal and environmental
              challenges. By promoting a culture of collaboration and continuous
              learning, we strive to create a lasting impact that enhances
              decision-making, supports sustainable development, and improves
              the overall well-being of society and the environment.
            </p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center md:space-x-8 md:space-y-0 space-y-8 w-full">
          <div className="md:w-[70%] flex flex-col md:space-y-14 space-y-10">
            <div className="flex">
              <h2 className="md:text-[70px] text-4xl font-bold relative flex">
                <span className="z-10">Our Mission</span>
                <span className="absolute h-3 md:w-[24rem] mx-auto w-full bg-[#FFCFD2] left-0 md:-bottom-3 bottom-0"></span>
              </h2>
            </div>
            <p className="md:leading-loose leading-loose md:text-lg text-justify">
              SDSSN is committed to advancing the use of geospatial technologies
              as a transformative tool for solving complex, real-world
              challenges across diverse sectors such as health, agriculture,
              urban planning, and disaster management. By fostering
              collaboration and facilitating knowledge exchange among geospatial
              professionals, academics, and industry leaders, we aim to build a
              vibrant community where innovation thrives.
            </p>
          </div>
          <div className="md:w-[30%] md:block hidden">
            <Image
              src={mission}
              alt="mission and vision"
              className="float-end"
            />
          </div>
        </div>
        <div className="bg-[#0A0E14] md:p-32 p-10 rounded-3xl text-white">
          <div className="flex items-start md:mb-10 mb-6">
            <Heading4
              text={"Our mission extends"}
              className={
                "bold underline underline-offset-4 md:text-[40px] text-3xl shrink-0"
              }
            />
            <Image
              src={vector}
              alt="vector"
              className="pr-5 md:-mt-10 -mt-5 relative right-10 md:w-auto w-20"
            />
          </div>
          <div className="space-y-4 text-justify text-sm md:text-lg">
            <p>
              To enhancing capacity-building efforts and professional
              development through comprehensive training programs, cutting-edge
              research, and outreach initiatives that empower individuals and
              organizations alike. We advocate for the integration of geospatial
              data into critical decision-making processes at local, national,
              and international levels, ensuring that spatial intelligence
              becomes a cornerstone of informed policy-making.
            </p>
            <p>
              In alignment with global sustainable development goals, SDSSN
              leverages geospatial technologies to promote environmental
              conservation, resource management, and resilience, contributing to
              a more sustainable and equitable future for all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
