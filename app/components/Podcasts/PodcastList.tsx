'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaComment, FaRegEye, FaRegFileAudio } from 'react-icons/fa';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import Heading3 from '../Heading3';
import Heading4 from '../Heading4';
import Loading from '../Loading';
import 'react-h5-audio-player/lib/styles.css';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player/lazy';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import { useDataStore } from '@/app/stores/dataStore';
import AudioPlayer from '../AudioPlayer';
import PodcastImage from './PodcastImage';
import { AiFillLike } from 'react-icons/ai';
import { CiShare2 } from 'react-icons/ci';
import ShareModal from '../ShareModal';

const categories = [
  { name: 'Audio', value: 'audio', icon: <FaRegFileAudio /> },
  { name: 'Video', value: 'video', icon: <MdOutlineVideoLibrary /> },
];

const PodcastList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [podcasts, setPodcasts] = useState([]);
  const [user, setUser] = useState({});

  const [videoPodcasts, setVideoPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPodcasts, likePodcast, sharePodcast } = useDataStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

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
      setPodcasts(audioPodcasts);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const like = async (podcastId) => {
    try {
      await likePodcast(podcastId);
      fetchAllPodcasts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const share = async (podcastId) => {
    try {
      await sharePodcast(podcastId);
      fetchAllPodcasts();
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = JSON.parse(
        localStorage.getItem('isAuthenticated') || 'false'
      );
      setUser(storedAuth);
    }
    fetchAllPodcasts();
  }, []);

  if (!podcasts) return <Loading />;
  if (!videoPodcasts) return <Loading />;
  if (isLoading) {
    return <Loading />;
  }

  const currentTab = searchParams.get('tab') || 'audio';

  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/podcasts?tab=${selectedTab}`, { scroll: false });
  };

  return (
    <>
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
                        <PodcastImage
                          src={podcast?.banner?.url}
                          alt={podcast.title}
                        />
                        <div className="w-full space-y-3">
                          <Heading4 text={podcast.title} className={''} />
                          <div
                            dangerouslySetInnerHTML={sanitizeHTML(
                              podcast?.description
                            )}
                            className="article-description text-justify"
                          ></div>

                          <AudioPlayer url={podcast?.audio_url} />
                        </div>
                      </div>
                      <div className="w-[25%]">
                        <div>
                          <p>
                            {`By: ${podcast?.user?.first_name} ${podcast?.user?.last_name}`}
                          </p>
                          <p>Date: {formatDate(podcast?.created_at)}</p>
                        </div>
                        <div className="flex space-x-5 mt-5">
                          <button
                            disabled={!user}
                            onClick={() => like(podcast.id)}
                            className="flex items-center space-x-2 disabled:bg-transparent"
                          >
                            <AiFillLike size={20} />{' '}
                            <span>{podcast?.likes}</span>
                          </button>
                          <button
                            className="flex items-center space-x-2"
                            onClick={() => {
                              setSelectedPodcast(podcast);
                              setIsShareModalOpen(true);
                            }}
                          >
                            <CiShare2 size={20} />{' '}
                            <span>{podcast?.shares}</span>
                          </button>
                        </div>
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
                            url={podcast.video_url}
                            width={293}
                            height={165}
                          />
                        </div>
                        <div className="space-y-3">
                          <Heading4 text={podcast.title} className={''} />
                          <div
                            dangerouslySetInnerHTML={sanitizeHTML(
                              podcast?.description
                            )}
                            className="article-description text-justify"
                          ></div>
                        </div>
                      </div>
                      <div className="w-[25%]">
                        <p>
                          {`By: ${podcast?.user?.first_name} ${podcast?.user?.last_name}`}
                        </p>
                        <p>Date: {formatDate(podcast?.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          share(selectedPodcast?.id);
          setIsShareModalOpen(false);
        }}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title={selectedPodcast?.title || ''}
      />
    </>
  );
};

export default PodcastList;
