import { podcastHero } from '@/public/images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Heading3 from '../Heading3';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';

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
  return (
    <div className="grid md:grid-cols-2 mb-10">
      <div>
        <p className="text-xl">Most Recent</p>
        <Heading3
          text={podcasts.length > 0 && podcasts[0]?.title}
          style="text-[#086DB9] leading-normal md:text-[57px] font-semibold"
        />
        <p className="text-xl">
          By {podcasts.length > 0 && podcasts[0]?.user?.first_name}
        </p>
        <div className="mt-5">
          <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src="/podcasts/podcast1.mp3"
            onPlay={(e) => toast.success('Media Playing')}
          />
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
