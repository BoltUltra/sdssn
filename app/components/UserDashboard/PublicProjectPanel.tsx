import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Maps from "./Maps";
import Discussions from "./Discussions";
import Links from "./Links";

const PublicProjectPanel = () => {
  const router = useRouter();
  const goToUpload = () => {
    router.push("/dashboard/projects?tab=upload");
  };
  return (
    <TabGroup>
      <TabList className="flex md:gap-16 gap-10 pb-6">
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Maps
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Discussion
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Links
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <Maps />
        </TabPanel>
        <TabPanel className="">
          <Discussions />
        </TabPanel>
        <TabPanel className="">
          <Links />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default PublicProjectPanel;
