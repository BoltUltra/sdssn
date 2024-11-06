import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegFileAudio } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Heading3 from "../Heading3";
import Heading4 from "../Heading4";
import Loading from "../Loading";
import Image from "next/image";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import toast from "react-hot-toast";
import ReactPlayer from "react-player/lazy";

const categories = [
  { name: "Audio", value: "audio", icon: <FaRegFileAudio /> },
  { name: "Video", value: "video", icon: <MdOutlineVideoLibrary /> },
];

const PodcastList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [podcasts, setPodcasts] = useState(null);
  const [videoPodcasts, setVideoPodcasts] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setPodcasts(data.audioPodcasts))
      .catch((error) => console.error("Error fetching data:", error));

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setVideoPodcasts(data.videoPodcasts))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!podcasts) return <Loading />;
  if (!videoPodcasts) return <Loading />;

  const currentTab = searchParams.get("tab") || "audio";

  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/podcasts?tab=${selectedTab}`, { scroll: false });
  };
  return (
    <div className="w-full justify-center px-4 bg-primary rounded-xl text-white md:p-14">
      <div className="w-full">
        <TabGroup selectedIndex={currentTabIndex} onChange={handleTabChange}>
          <TabList className="flex items-center justify-between">
            <Heading4 text="Latest Podcast Episodes" className="text-white" />
            <div className="flex md:gap-16 gap-10">
              {categories.map(({ name, icon }) => (
                <Tab
                  key={name}
                  className="pb-1 flex items-center space-x-3 font-semibold border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-white data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </Tab>
              ))}
            </div>
          </TabList>
          <TabPanels className="mt-20">
            <TabPanel>
              <div className="space-y-5">
                {podcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="flex space-x-4 w-[75%] border-r-2 border-r-white pr-10 mr-10">
                      <Image
                        src={podcast.image}
                        alt={podcast.title}
                        height={170}
                        width={140}
                        quality={80}
                        className="object-cover w-[170px] h-[180px] object-center"
                      />
                      <div className="w-full space-y-3">
                        <Heading4 text={podcast.title} className={""} />
                        <p>{podcast.description}</p>
                        <AudioPlayer
                          autoPlay={false}
                          autoPlayAfterSrcChange={false}
                          src={podcast.podcastLink}
                          onPlay={(e) => toast.success("Media Playing")}
                        />
                      </div>
                    </div>
                    <div className="w-[25%]">
                      <p>By: {podcast.by}</p>
                      <p>Date: {podcast.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="space-y-5">
                {videoPodcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 w-[75%] border-r-2 border-r-white pr-10 mr-10">
                      <div className="w-[293px]">
                        <ReactPlayer
                          url={podcast.podcastLink}
                          width={293}
                          height={165}
                        />
                      </div>
                      <div className="space-y-3">
                        <Heading4 text={podcast.title} className={""} />
                        <p>{podcast.description}</p>
                      </div>
                    </div>
                    <div className="w-[25%]">
                      <p>By: {podcast.by}</p>
                      <p>Date: {podcast.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default PodcastList;
