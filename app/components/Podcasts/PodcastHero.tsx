import { podcastHero } from '@/public/images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Heading3 from '../Heading3';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';
import YouTubeAudioPlayer from '../AudioPlayer';
import Loading from '../Loading';

const PodcastHero = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPodcasts } = useDataStore();

  const fetchAllPodcasts = async () => {
    setIsLoading(true);

    try {
      const response = await fetchPodcasts();

      const audioPodcasts = response.data.filter(
        (podcast) => podcast.category === 'audio'
      );

      setPodcasts(audioPodcasts);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPodcasts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid md:grid-cols-2 mb-10 md:items-end">
      <div>
        <p className="flex">
          <span className="bg-primary/50 text-xs rounded-full px-5 py-2 text-white">
            Most Recent
          </span>
        </p>
        <Heading3
          text={podcasts.length > 0 && podcasts[0]?.title}
          style="text-[#086DB9] leading-normal md:text-[57px] font-semibold"
        />
        <p className="text-xl capitalize">
          By {podcasts.length > 0 && podcasts[0]?.user?.name}
        </p>
        <div className="mt-5 md:mb-0 mb-5">
          <YouTubeAudioPlayer url={podcasts[0]?.audio_url} />
        </div>
      </div>
      <div>
        {/* Image */}
        {podcasts.length > 0 && (
          <Image
            src={podcasts[0]?.banner?.url}
            alt={podcasts[0]?.title}
            width={427.18}
            height={482.02}
            className="md:w-[427.18px] w-full md:h-[482.02px] float-end items-center object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default PodcastHero;
