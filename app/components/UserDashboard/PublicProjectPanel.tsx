import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Maps from './Maps';
import Discussions from './Discussions';
import Links from './Links';
import { useDataStore } from '@/app/stores/dataStore';

const PublicProjectPanel = () => {
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
      console.log('User discussions:', userDiscussions);
      console.log('User maps:', userMaps);
      console.log('User links:', userLinks);
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
        {/* <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Links
        </Tab> */}
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <Maps maps={maps} isLoading={isLoading} />
        </TabPanel>
        <TabPanel className="">
          <Discussions discussions={discussions} isLoading={isLoading} />{' '}
        </TabPanel>
        {/* <TabPanel className="">
          <Maps />
        </TabPanel> */}
      </TabPanels>
    </TabGroup>
  );
};

export default PublicProjectPanel;
