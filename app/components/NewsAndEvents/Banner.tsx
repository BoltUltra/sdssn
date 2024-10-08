import { eventbanner } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading4 from "../Heading4";

const Banner = () => {
  return (
    <section className="pt-44 pb-20">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5">
        <div className="">
          <Image src={eventbanner} alt="banner" className="" />
        </div>
        <div className="bg-primary text-white flex md:flex-row flex-col items-center justify-between p-6 md:p-8 rounded-lg md:space-y-0 spade-y-6">
          <div>
            <Heading4
              text={"Discussing Spatial Science (25 Jan. 2023)"}
              className="bold pb-2"
            />
            <p>
              The annual business submit would take place on monday, 20TH SEPT.
            </p>
          </div>
          <button className="bg-[#586D80] px-10 md:w-auto w-full py-4 rounded-lg">
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
