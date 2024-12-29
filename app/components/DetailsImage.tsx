'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DetailsImageProps {
  src: string;
  alt: string;
}

const DetailsImage: React.FC<DetailsImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={1000}
      height={500}
      className="w-full h-[500px] object-cover"
      onError={() => {
        setImgSrc('/images/png/placeholder.png');
      }}
    />
  );
};

export default DetailsImage;
