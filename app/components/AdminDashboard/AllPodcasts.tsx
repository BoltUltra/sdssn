import React, { useEffect, useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import AllMaps from './AllMaps';
import AllDiscussions from './AllDiscussions';
import { useDataStore } from '@/app/stores/dataStore';
import AudioPodcasts from './AudioPodcasts';
import VideoPodcasts from './VideoPodcasts';

const AllPodcasts = () => {
  const router = useRouter();
  const [audioPodcasts, setAudioPodcasts] = useState([]);
  const [videoPodcasts, setVideoPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchPodcasts } = useDataStore();

  const fetchAllPodcasts = async () => {
    setIsLoading(true);

    try {
      const response = await fetchPodcasts();
      console.log('All podcasts:', response.data);

      const videoPodcasts = response.data.filter(
        (podcast) => podcast.category === 'video'
      );
      const audioPodcasts = response.data.filter(
        (podcast) => podcast.category === 'audio'
      );

      setVideoPodcasts(videoPodcasts);
      setAudioPodcasts(audioPodcasts);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPodcasts();
  }, []);

  return (
    <TabGroup>
      <TabList className="flex md:gap-16 gap-10 pb-6">
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Audio
        </Tab>
        <Tab className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
          Video
        </Tab>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel className="">
          <AudioPodcasts audioPodcasts={audioPodcasts} />
        </TabPanel>
        <TabPanel className="">
          <VideoPodcasts videoPodcasts={videoPodcasts} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default AllPodcasts;
