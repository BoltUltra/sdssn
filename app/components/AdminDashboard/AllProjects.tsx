import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Links from '../UserDashboard/Links';
import AllMaps from './AllMaps';
import AllDiscussions from './AllDiscussions';
import AllPodcasts from './AllPodcasts';
import ApprovedMaps from './ApprovedMaps';
import ApprovedDicussions from './ApprovedDiscussion';
import { useDataStore } from '@/app/stores/dataStore';

const AllProjects = () => {
  const router = useRouter();
  const [discussions, setDiscussions] = useState([]);
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllPosts } = useDataStore();

  const fetchDiscussions = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAllPosts();

      const userDiscussions = response.data.filter(
        (post) => post.category === 'discussion' && post.approved_by !== null
      );
      const userMaps = response.data.filter(
        (post) => post.category === 'map' && post.approved_by !== null
      );

      setDiscussions(userDiscussions);
      setMaps(userMaps);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

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
          <ApprovedMaps maps={maps} />
        </TabPanel>
        <TabPanel className="">
          <ApprovedDicussions discussions={discussions} />
        </TabPanel>
        <TabPanel className="">
          <AllPodcasts />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default AllProjects;
