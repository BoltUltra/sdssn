'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PodcastImageProps {
  src: string;
  alt: string;
}

const PodcastImage: React.FC<PodcastImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      height={170}
      width={140}
      quality={80}
      className="object-cover w-[170px] h-[180px] object-center"
      onError={() => {
        setImgSrc('/images/others/podcast.webp');
      }}
    />
  );
};

export default PodcastImage;
