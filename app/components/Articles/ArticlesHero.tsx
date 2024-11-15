import { formatDate } from '@/app/helpers';
import Image from 'next/image';
import React from 'react';

const ArticlesHero = ({ articles }) => {
  console.log('Articles:', articles[1]?.banner?.url.replace(/\\/g, ''));
  return (
    <section className="mb-10">
      <p className="text-5xl py-2 mb-14 font-extralight uppercase text-primary">
        Featured
      </p>
      <div className="grid lg:grid-cols-2 lg:gap-32 gap-10 items-end">
        <div className="">
          <Image
            // src={articles[2]?.banner?.url.replace(/\\/g, '') || podcastHero}
            src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
            width={427.18}
            height={482.02}
            alt="Article Banner"
            className="lg:h-[482.02px] w-full float-end items-center object-cover"
          />
        </div>
        <div>
          {articles[1]?.created_at ? (
            <p className="text-sm font-light">
              {formatDate(articles[1]?.created_at)}
            </p>
          ) : (
            <div className="bg-gray-300 h-10 w-full animate-pulse block rounded-lg"></div>
          )}

          <div className="">
            {articles[1]?.title ? (
              <p className="font-bold text-5xl leading-snug">
                {articles[1]?.title}
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
