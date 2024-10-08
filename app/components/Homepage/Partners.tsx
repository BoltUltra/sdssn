import { partner } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading4 from "../Heading4";

const Partners = () => {
  return (
    <section>
      <div className="section-container">
        <Heading4 text={"Partners"} className={"semibold text-center"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="flex justify-center items-center">
            <Image src={partner} alt="partner" />
          </div>
          <div className="flex justify-center items-center">
            <Image src={partner} alt="partner" />
          </div>
          <div className="flex justify-center items-center">
            <Image src={partner} alt="partner" />
          </div>
          <div className="flex justify-center items-center">
            <Image src={partner} alt="partner" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
