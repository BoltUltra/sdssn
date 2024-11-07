import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Links from '../UserDashboard/Links';
import AllMaps from './AllMaps';
import AllDiscussions from './AllDiscussions';
import AllPodcasts from './AllPodcasts';

const AllProjects = () => {
  const router = useRouter();

  return (
    <TabGroup>
      <TabList className="flex md:gap-16 gap-10 pb-6 border-b border-b-primary">
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Maps
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Discussion
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Podcasts
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <AllMaps />
        </TabPanel>
        <TabPanel className="">
          <AllDiscussions />
        </TabPanel>
        <TabPanel className="">
          <AllPodcasts />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default AllProjects;
