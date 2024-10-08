import { president } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading3 from "../Heading3";
import Heading4 from "../Heading4";

const President = () => {
  return (
    <section className="bg-white">
      <div className="section-container">
        {/* <div className="flex flex-col items-center justify-center space-y-2">
          <Heading3 text={"Message from the President"} />
          <div className="h-0.5 w-40 bg-[#C30711]"></div>
        </div> */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-3">
            <Heading4 text={"SDSSN President"} className={"semibold"} />
            <p className="text-lg leading-normal">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              doeiusmod tempor incididunt ut laboredolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo
            </p>
          </div>
          <div>
            <p className="text-lg text-[#333333] mt-5">
              <Image src={president} alt="president image" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default President;
