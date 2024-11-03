import { podcastHero } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading3 from "../Heading3";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import toast from "react-hot-toast";

const PodcastHero = () => {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <p className="text-xl">Most Recent</p>
        <Heading3
          text="Productive effect of date science in our community at large"
          style="text-[#086DB9] leading-normal md:text-[57px] font-semibold"
        />
        <p className="text-xl">
          Get an in-depth understanding on how data science impart our community
        </p>
        <div className="mt-5">
          <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src="/podcasts/podcast1.mp3"
            onPlay={(e) => toast.success("Media Playing")}
          />
        </div>
      </div>
      <div>
        <Image
          src={podcastHero}
          alt=""
          className="md:w-[427.18px] md:h-[482.02px] float-end items-center"
        />
      </div>
    </div>
  );
};

export default PodcastHero;
