import React from 'react';
import MapWithUsers from '../Map';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="pt-44 pb-20 bg-primary text-white md:text-left text-center">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="">
            <h3 className="font-bold md:text-4xl text-2xl md:leading-normal leading-normal">
              <span className="md:text-5xl">
                Spatial and Data Science Society of Nigeria
              </span>{' '}
              <br />
              {/* <span className="relative">
                SDSSN
                <Image
                  src={"/images/svg/pattern.svg"}
                  height={100}
                  width={100}
                  alt="pattern"
                  className="absolute -bottom-1 w-full md:left-0 right-0"
                />
              </span>{" "} */}
              <span className="font-normal">
                Geo AI | Data Science | Spatial Analysis.
              </span>
            </h3>
            <p className="mt-3 md:text-lg">
              Learn about new knowledge and abilities from experts and
              professionals in any field{' '}
            </p>
            <div className="flex md:flex-row flex-col items-center md:space-x-6 md:space-y-0 space-y-6 mt-16">
              <button className="bg-white text-primary px-5 py-3 rounded-lg border border-white md:w-56 w-full">
                Become a member
              </button>
              <button className="bg-transparent text-white px-5 py-3 rounded-lg border border-white md:w-56 w-full">
                Learn more
              </button>
            </div>
          </div>
          <div className="w-full md:h-[30rem] h-96 rounded-lg overflow-hidden">
            <MapWithUsers />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
