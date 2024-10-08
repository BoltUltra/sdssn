import React from "react";
import Heading3 from "../Heading3";
import { teammember } from "@/public/images";
import Image from "next/image";

const TeamMembers = () => {
  const members = [
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
    {
      name: "Daniel John",
      role: "Data Research Analysts",
      image: teammember,
    },
  ];
  return (
    <section className="">
      <div className="section-container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Heading3 text={"Team Members"} />
          <div className="h-0.5 w-40 bg-[#C30711]"></div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-32 gap-10 text-center md:mt-20 mt-10 md:mx-0 mx-5">
          {members.map((member, index) => (
            <div
              key={index}
              className="text-center space-y-6 md:hover:scale-110 transition-all duration-500 ease-in-out md:hover:cursor-pointer"
            >
              <Image src={member.image} alt={member.name} className="mx-auto" />
              <div>
                <h3 className="text-xl font-bold mt-5">{member.name}</h3>
                <p className="">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
