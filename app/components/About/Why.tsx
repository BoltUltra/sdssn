import React from "react";
import Heading3 from "../Heading3";
import Heading4 from "../Heading4";
import {
  capacity,
  collaboration,
  innovation,
  knowledge,
  professionalism,
  sustainability,
} from "@/public/images";
import Image from "next/image";

const Why = () => {
  const values = [
    {
      title: "Innovation",
      description:
        "Embracing cutting-edge technologies and methods todrive progress in geospatial science and data analysis. ",
      icon: innovation,
    },
    {
      title: "Collaboration",
      description:
        "Fostering partnerships and cooperation among professionals,academics, industries, and communities.",
      icon: collaboration,
    },
    {
      title: "Knowledge Sharing",
      description:
        "Promoting open access to information, expertise, and best practices to enhance learning and development.",
      icon: knowledge,
    },
    {
      title: "Sustainability",
      description:
        "Supporting solutions thatprioritize environmental stewardship and sustainable development practices.",
      icon: sustainability,
    },
    {
      title: "Professionalism",
      description:
        "Upholding the highest standards of integrity, ethical conduct, and excellence in all endeavors.",
      icon: professionalism,
    },
    {
      title: "Capacity Building",
      description:
        "Investing in education, training, and skill development to empower individuals and organizations.",
      icon: capacity,
    },
  ];
  return (
    <section className="bg-[#E6E6E6]">
      <div className="section-container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Heading3 text={"Why Choose Us?"} />
          <div className="h-0.5 w-40 bg-[#C30711]"></div>
        </div>
        <div className="text-center md:max-w-xl mx-auto space-y-4 my-5">
          <Heading4
            text={"Our Core Values Are Our Key To Success"}
            className={""}
          />
          <p className="md:text-xl">
            To achieve our mission, we are guided by six (6) powerful principles
            that keep us moving ahead.
          </p>
        </div>
        <div className="grid md:grid-cols-3 md:gap-20 gap-10 text-center mt-10 md:mx-0 mx-5">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center bg-white py-9 px-6 rounded-xl space-y-6 md:hover:scale-110 transition-all duration-500 ease-in-out md:hover:cursor-pointer"
            >
              <Image src={value.icon} alt={value.title} className="mx-auto" />
              <h3 className="text-xl font-bold mt-5">{value.title}</h3>
              <p className="">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
