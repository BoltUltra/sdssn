import { map, user } from "@/public/images";
import Image from "next/image";
import React from "react";
import Heading3 from "../Heading3";
import { CiShare2 } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";

const SharedMap = () => {
  const maps = [
    {
      id: 1,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Abuja",
      mapImg: map,
    },
    {
      id: 2,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Lagos",
      mapImg: map,
    },
    {
      id: 3,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Ibadan",
      mapImg: map,
    },
    {
      id: 4,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
    {
      id: 5,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
    {
      id: 6,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
    {
      id: 7,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
    {
      id: 8,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
    {
      id: 9,
      username: "Femi Oluwafemi",
      userImg: user,
      title: "Map of Kano",
      mapImg: map,
    },
  ];
  return (
    <div>
      <section className="bg-[#F8F8F8]">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heading3 text={"Maps Shared By members "} />
            <div className="h-0.5 w-40 bg-[#C30711]"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {maps.map((map) => (
              <div key={map.id} className="text-center">
                <Image src={map.mapImg} alt={map.username} className="" />
                <div className="bg-[#D9D9D9] flex items-center justify-between p-5 -mt-1 rounded-b-lg">
                  <Image
                    src={map.userImg}
                    alt={map.username}
                    className="rounded-full w-10"
                  />
                  <div className="text-center">
                    <p className="font-semibold text-lg">{map.title}</p>
                    <p className="text-sm">{map.username}</p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <button className="text-[#C30711]">
                      <FaHeart />
                    </button>
                    <button className="">
                      <FaRegComment />
                    </button>
                    <button className="">
                      <CiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedMap;
