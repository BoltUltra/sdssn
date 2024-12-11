import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/app/stores/dataStore';
import Maps from '../UserDashboard/Maps';
import Discussions from '../UserDashboard/Discussions';
import UploadMaps from './UploadMaps';
import UploadDiscussions from './UploadDiscussions';
import UploadPodcasts from './UploadPodcasts';

const ProjectUpload = () => {
  const router = useRouter();
  const [discussions, setDiscussions] = useState([]);
  const [maps, setMaps] = useState([]);
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAllPosts } = useDataStore();

  const fetchDiscussions = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAllPosts();
      console.log('All posts:', response.data);

      // Filter posts to only include those matching the user's ID
      const userPosts = response.data.filter(
        (post) => post.user.id === user.id
      );

      const userDiscussions = userPosts.filter(
        (post) => post.category === 'discussion'
      );
      const userMaps = userPosts.filter((post) => post.category === 'map');
      const userLinks = userPosts.filter((post) => post.category === 'link');

      setDiscussions(userDiscussions);
      setMaps(userMaps);
      setLinks(userLinks);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      setUser(storedAuth);
    }
    fetchDiscussions();
  }, [user.id]);
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
          Podcasts
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <UploadMaps />
        </TabPanel>
        <TabPanel className="">
          <UploadDiscussions />
        </TabPanel>
        <TabPanel className="">
          <UploadPodcasts />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default ProjectUpload;
