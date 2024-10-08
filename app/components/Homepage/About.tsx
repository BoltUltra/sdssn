import React from "react";
import Heading3 from "../Heading3";

const About = () => {
  return (
    <section className="">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5 md:py-20 py-10 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Heading3 text={"About SDSSN"} />
          <div className="h-0.5 w-40 bg-[#C30711]"></div>
        </div>
        <p className="md:max-w-4xl mx-auto mt-11 md:leading-loose">
          Spatial Data Science Society of Nigeria (SDSSN), established in 2020,
          serves as a dynamic and innovative platform that fosters collaboration
          among geospatial and data science professionals across Nigeria and the
          African continent. SDSSN is dedicated to advancing the application of
          spatial data science by bridging the gap between the acquisition of
          geospatial skills and their practical implementation in high-impact
          projects that address critical challenges. At the core of its mission
          is the integration of data and spatial intelligence to drive
          development and decision-making across various sectors.
        </p>
        <button className="bg-primary text-white px-10 py-3 rounded-lg mt-10">
          Learn more
        </button>
      </div>
    </section>
  );
};

export default About;
