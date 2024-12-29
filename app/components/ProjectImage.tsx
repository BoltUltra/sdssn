'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      height={300}
      width={300}
      quality={80}
      className="object-cover h-[300px] object-center w-full"
      onError={() => {
        setImgSrc('/images/png/placeholder.png');
      }}
    />
  );
};

export default ProjectImage;
