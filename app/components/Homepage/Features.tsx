import { demoImage } from "@/public/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Heading3 from "../Heading3";

const Features = () => {
  const router = useRouter();
  const feats = [
    {
      id: 1,
      name: "Podcasts",
      link: "/podcasts",
      img: demoImage,
    },
    {
      id: 1,
      name: "Articles",
      link: "/articles",
      img: demoImage,
    },
    {
      id: 1,
      name: "Data",
      link: "/data",
      img: demoImage,
    },
  ];
  return (
    <div>
      <section className="bg-[#F8F8F8] py-20">
        <div className="max-w-[1440px] mx-auto md:px-20 px-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heading3 text={"Features"} />
            <div className="h-0.5 w-40 bg-[#C30711]"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {feats.map((feat) => (
              <div key={feat.id} className="text-center">
                <Image
                  src={feat.img}
                  alt={feat.name}
                  className="mx-auto rounded-md"
                />
                <div className="p-5">
                  <button
                    onClick={() => router.push(feat.link)}
                    className="bg-primary text-white px-20 py-3 rounded-lg mt-3"
                  >
                    {feat.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
