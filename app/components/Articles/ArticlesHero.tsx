import { formatDate } from '@/app/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import HeroImage from '../HeroImage';

const ArticlesHero = ({ articles }) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(articles[0]?.banner?.url);

  const goToArticle = () => {
    router.push(`/articles/${articles[0]?.id}`);
  };
  return (
    <section className="mb-10">
      <p className="text-5xl py-2 mb-14 font-extralight uppercase text-primary">
        Featured
      </p>
      <div className="grid lg:grid-cols-2 lg:gap-20 gap-10 items-end">
        <div className="lg:order-first order-last">
          {articles[0]?.banner?.url ? (
            <HeroImage
              src={articles[0]?.banner?.url}
              alt={articles[0]?.title}
            />
          ) : (
            <div className="bg-gray-300 lg:h-[482.02px] w-full animate-pulse block rounded-lg"></div>
          )}
        </div>
        <div>
          {articles[0]?.created_at ? (
            <p className="text-sm font-light">
              {formatDate(articles[0]?.created_at)}
            </p>
          ) : (
            <div className="bg-gray-300 h-10 w-full animate-pulse block rounded-lg"></div>
          )}

          <div className="cursor-pointer mt-3" onClick={goToArticle}>
            {articles[0]?.title ? (
              <p className="md:text-5xl text-2xl md:mt-0 mt-5 md:leading-none uppercase pr-10">
                {articles[0]?.title}
              </p>
            ) : (
              <div className="bg-gray-300 h-44 w-full animate-pulse block rounded-lg mt-5"></div>
            )}
          </div>
          <div className="mt-5"></div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesHero;
