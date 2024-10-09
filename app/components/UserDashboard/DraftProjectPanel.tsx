import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import DraftMaps from "./DraftMaps";
import DraftDiscussions from "./DraftDiscussions";
import DraftLinks from "./DraftLinks";

const DraftProjectPanel = () => {
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
          <DraftMaps />
        </TabPanel>
        <TabPanel className="">
          <DraftDiscussions />
        </TabPanel>
        <TabPanel className="">
          <DraftLinks />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default DraftProjectPanel;
