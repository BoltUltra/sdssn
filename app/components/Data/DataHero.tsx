import { formatDate } from '@/app/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const DataHero = ({ maps }) => {
  const router = useRouter();

  const goToData = () => {
    router.push(`/data/${maps[0]?.id}`);
  };
  return (
    <section className="mb-10">
      <p className="text-5xl py-2 mb-14 font-extralight uppercase text-primary">
        Featured
      </p>
      <div className="grid lg:grid-cols-2 lg:gap-32 gap-10 items-end">
        <div className="lg:order-first order-last">
          <Image
            // src={maps[2]?.banner?.url.replace(/\\/g, '') || podcastHero}
            src={maps[0]?.banner?.url}
            width={427.18}
            height={482.02}
            alt="Article Banner"
            className="lg:h-[482.02px] w-full float-end items-center object-cover"
          />
        </div>
        <div>
          {maps[0]?.created_at ? (
            <p className="text-sm font-light">
              {formatDate(maps[0]?.created_at)}
            </p>
          ) : (
            <div className="bg-gray-300 h-10 w-full animate-pulse block rounded-lg"></div>
          )}

          <div className="cursor-pointer mt-3" onClick={goToData}>
            {maps[0]?.title ? (
              <p className="md:text-5xl text-2xl md:mt-0 mt-5 md:leading-none uppercase pr-20">
                {maps[0]?.title}
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

export default DataHero;
