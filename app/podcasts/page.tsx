"use client";
import React from "react";
import Image from "next/image";
import { Footer, Header } from "../components";
import Heading3 from "../components/Heading3";
import Heading4 from "../components/Heading4";

export default function Membership() {
  return (
    <>
      <Header />
      <section className="pt-44 pb-20 bg-background">
        <div className="section-container">
          <div className="md:max-w-sm mx-auto text-center space-y-3 md:mb-16 mb-12">
            <Heading3 text={"Membership Fees"} />
            <p>Explore the right option for you and pick your prefered plan</p>
          </div>
          <div className="grid md:grid-cols-4 md:gap-2 gap-8">
            <div>
              <div className="bg-[#166BB8] text-white py-5 rounded-t-lg text-center text-lg">
                <p>Graduate</p>
              </div>
              <div className="bg-primary text-white h-[170px] flex items-center justify-center">
                <Heading4 text={"FREE"} className={"semibold text-4xl"} />
              </div>
              <div className="bg-white">
                <p className="px-5 py-4 font-semibold border-b-2 border-b-black text-lg">
                  Benefits:
                </p>
                <p className="plan-text">
                  Access to academic datasets and research resources
                </p>
                <p className="plan-text">
                  Discounted or free access to geospatial software and tools
                </p>
                <p className="plan-text">
                  Mentorship and networking opportunities
                </p>
                <p className="plan-text">
                  Participation in student competitions and hackathons
                </p>
              </div>
              <div className="h-[150px] flex items-center justify-center rounded-b-lg bg-white">
                <button className="border border-primary px-10 py-4 rounded-lg w-52">
                  Free
                </button>
              </div>
            </div>
            <div>
              <div className="bg-[#166BB8] text-white py-5 rounded-t-lg text-center text-lg">
                <p>Associate</p>
              </div>
              <div className="bg-primary text-white h-[170px] flex flex-col items-center justify-center">
                <Heading4 text={"N15,000"} className={"semibold text-4xl"} />
                <p className="text-sm">Annually</p>
              </div>
              <div className="bg-white">
                <p className="px-5 py-4 font-semibold border-b-2 border-b-black text-lg">
                  Benefits:
                </p>
                <p className="plan-text">Professional development resources</p>
                <p className="plan-text">
                  Networking opportunities with industry peers
                </p>
                <p className="plan-text">
                  Discounts on industry conferences and events
                </p>
                <p className="plan-text">
                  Access to exclusive job board and career resources
                </p>
              </div>
              <div className="h-[150px] flex items-center justify-center rounded-b-lg bg-white">
                <button className="border border-primary px-10 py-4 rounded-lg w-52">
                  Upgrade Now
                </button>
              </div>
            </div>
            <div>
              <div className="bg-[#166BB8] text-white py-5 rounded-t-lg text-center text-lg">
                <p>Professional</p>
              </div>
              <div className="bg-primary text-white h-[170px] flex flex-col items-center justify-center">
                <Heading4 text={"N20,000"} className={"semibold text-4xl"} />
                <p className="text-sm">Annually</p>
              </div>
              <div className="bg-white">
                <p className="px-5 py-4 font-semibold border-b-2 border-b-black text-lg">
                  Benefits:
                </p>
                <p className="plan-text">
                  Access to premium geospatial data and analytics tools
                </p>
                <p className="plan-text">
                  Customizable dashboards and reporting tools
                </p>
                <p className="plan-text">
                  Technical support and troubleshooting assistance
                </p>
                <p className="plan-text">
                  Integration with other professional tools and platforms
                </p>
              </div>
              <div className="h-[150px] flex items-center justify-center rounded-b-lg bg-white">
                <button className="border border-primary px-10 py-4 rounded-lg w-52">
                  Upgrade Now
                </button>
              </div>
            </div>
            <div>
              <div className="bg-[#166BB8] text-white py-5 rounded-t-lg text-center text-lg">
                <p>Cooperate</p>
              </div>
              <div className="bg-primary text-white h-[170px] flex flex-col items-center justify-center">
                <Heading4 text={"N30,000"} className={"semibold text-4xl"} />
                <p className="text-sm">Annually</p>
              </div>
              <div className="bg-white">
                <p className="px-5 py-4 font-semibold border-b-2 border-b-black text-lg">
                  Benefits:
                </p>
                <p className="plan-text">
                  Enterprise-level geospatial solutions
                </p>
                <p className="plan-text">Dedicated account manager</p>
                <p className="plan-text">
                  Volume discounts and preferential pricing
                </p>
                <p className="plan-text">Training and onboarding services</p>
              </div>
              <div className="h-[150px] flex items-center justify-center rounded-b-lg bg-white">
                <button className="border border-primary px-10 py-4 rounded-lg w-52">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
