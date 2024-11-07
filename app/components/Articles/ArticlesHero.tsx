import { podcastHero } from '@/public/images';
import Image from 'next/image';
import React from 'react';
import Heading3 from '../Heading3';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import toast from 'react-hot-toast';

const ArticlesHero = ({ articles }) => {
  console.log('Articles:', articles[2]?.banner?.url.replace(/\\/g, ''));
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <p className="text-xl">Most Recent</p>
        <Heading3
          text={articles[2]?.title || 'Title'}
          style="text-[#086DB9] leading-normal md:text-[57px] font-semibold"
        />
        <p className="text-xl">{articles[3]?.title}</p>
        <div className="mt-5"></div>
      </div>
      <div>
        <Image
          src={articles[2]?.banner?.url.replace(/\\/g, '')}
          width={427.18}
          height={482.02}
          alt="Article Banner"
          className="md:w-[427.18px] md:h-[482.02px] float-end items-center"
        />
      </div>
    </div>
  );
};

export default ArticlesHero;
