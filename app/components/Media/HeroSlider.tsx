"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading";
import Image from "next/image";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // cssEase: "linear",
};
const HeroSlider = () => {
  const [medias, setMedias] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setMedias(data.media))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!medias) return <Loading />;
  return (
    <section className="pt-44 pb-20">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5">
        {!medias && <div className="h-[640px] animate-pulse bg-gray-300"></div>}
        <Slider {...settings}>
          {medias.map((media, index) => (
            <div key={index} className="media-slide">
              <div className="media-link pr-5 h-[640px] w-full">
                <Image
                  src={media.image}
                  alt={media.title}
                  height={1000}
                  width={500}
                  className="media-image w-full object-cover object-center"
                />
              </div>
            </div>
          ))}
        </Slider>

        <div className="mt-40">
          <div className="grid md:grid-cols-4 gap-8">
            {medias.map((media) => (
              <div key={media.title} className="h-[441px] relative">
                <Image
                  // key={media.title}
                  src={media.image}
                  alt={media.title}
                  height={441}
                  width={283}
                  quality={80}
                  className="object-cover h-[441px] object-center"
                />
                <div className="absolute bg-white/80 p-3 bottom-0 w-full">
                  {media.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
