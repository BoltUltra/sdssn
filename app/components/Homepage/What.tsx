import React from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { LuGraduationCap } from "react-icons/lu";
import {
  MdJoinInner,
  MdKeyboardDoubleArrowRight,
  MdOutlineVolunteerActivism,
  MdPayments,
} from "react-icons/md";
import { PiHandshake } from "react-icons/pi";
import Heading3 from "../Heading3";
import { BiBookReader, BiSupport } from "react-icons/bi";
import Link from "next/link";

const What = () => {
  const members = [
    {
      id: 1,
      name: "Pay Membership Fees",
      text: "Lorem ipsum dolor et sit amet, consectetur",
      icon: <MdPayments />,
      link: "/membership",
    },
    {
      id: 2,
      name: "Get Resources",
      text: "Lorem ipsum dolor et sit amet, consectetur",
      icon: <BiBookReader />,
      link: "/resources",
    },
    {
      id: 3,
      name: "Collaborate",
      text: "Lorem ipsum dolor et sit amet, consectetur",
      icon: <MdJoinInner />,
      link: "/login",
    },
    {
      id: 3,
      name: "Make Enquiry",
      text: "Lorem ipsum dolor et sit amet, consectetur",
      icon: <BiSupport />,
      link: "/contact",
    },
  ];
  return (
    <>
      <section className="bg-background">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heading3 text={"WHAT DO YOU WANT TO DO?"} />
            <div className="h-0.5 w-40 bg-[#C30711]"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-10 mt-20">
            {members.map((item, index) => (
              <div
                key={index}
                className="text-center flex flex-col items-center space-y-3"
              >
                <div className="text-6xl text-[#C30711]">{item.icon}</div>
                <p className="text-xl font-bold">{item.name}</p>
                <h4 className="">{item.text}</h4>
                {/* <Link
                  href={item.link}
                  className="text-primary flex items-center"
                >
                  <span>Get Started</span>
                  <MdKeyboardDoubleArrowRight />
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default What;
