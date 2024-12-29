'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HeroImageProps {
  src: string;
  alt: string;
}

const HeroImage: React.FC<HeroImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={427.18}
      height={482.02}
      quality={80}
      className="lg:h-[482.02px] w-full float-end items-center object-cover"
      onError={() => {
        setImgSrc('/images/png/placeholder.png');
      }}
    />
  );
};

export default HeroImage;
