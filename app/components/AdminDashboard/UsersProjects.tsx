import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import ApprovedProjects from "./ApprovedProjects";
import AwaitingApproval from "./AwaitingApproval";

const UsersProjects = () => {
  return (
    <TabGroup>
      <TabList className="flex md:gap-16 gap-10 pb-6 border-b border-b-primary">
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Approved Projects
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Awaiting Approval
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <ApprovedProjects />
        </TabPanel>
        <TabPanel className="">
          <AwaitingApproval />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default UsersProjects;
