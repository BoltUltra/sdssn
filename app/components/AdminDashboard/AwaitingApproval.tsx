import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AwaitingApprovalMaps from './AwaitingApprovalMaps';
import AwaitingApprovalDiscussion from './AwaitingApprovalDiscussion';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/app/stores/dataStore';

const AwaitingApproval = () => {
  const router = useRouter();
  const [discussions, setDiscussions] = useState([]);
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAdminPosts } = useDataStore();

  const fetchDiscussions = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAdminPosts();

      const userDiscussions = response.data.data.filter(
        (post) => post.category === 'discussion' && post.approved_by === null
      );
      const userMaps = response.data.data.filter(
        (post) => post.category === 'map' && post.approved_by === null
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
      <TabList className="flex md:gap-16 gap-10 pb-6">
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Maps
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Discussions
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <AwaitingApprovalMaps maps={maps} />
        </TabPanel>
        <TabPanel className="">
          <AwaitingApprovalDiscussion discussions={discussions} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default AwaitingApproval;
