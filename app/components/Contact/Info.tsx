import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RxEnvelopeClosed } from "react-icons/rx";

const Info = () => {
  return (
    <section>
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="shadow-lg rounded-lg flex flex-col items-center justify-center space-y-3 text-center h-[369px]">
            <MdOutlineSupportAgent color="#C30711" size={60} />
            <p className="text-xl font-semibold">Give us a call</p>
            <p>+2348077823896</p>
          </div>
          <div className="shadow-lg rounded-lg flex flex-col items-center justify-center space-y-3 text-center h-[369px]">
            <GrMapLocation color="#C30711" size={60} />
            <p className="text-xl font-semibold">Locate us</p>
            <p>Abuja</p>
          </div>
          <div className="shadow-lg rounded-lg flex flex-col items-center justify-center space-y-3 text-center h-[369px]">
            <RxEnvelopeClosed color="#C30711" size={60} />
            <p className="text-xl font-semibold">Message us</p>
            <p>info@sdssn.org</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
