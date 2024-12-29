import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { formatDate } from '@/app/helpers';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import ProjectImage from '../ProjectImage';

const DataList = ({ maps }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full justify-center py-14">
        <h3 className="uppercase text-4xl flex md:flex-col md:space-y-1 md:space-x-0 space-x-1 border-l-2 border-l-primary/10 pl-4 pt-10">
          <span className="tracking-wide text-primary">recent</span>
          <span className="tracking-wide text-gray-500">data</span>
        </h3>
        <div className="w-full">
          <div className="mt-20">
            <div className="grid md:grid-cols-3 lg:gap-20 md:gap-10 gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="cursor-pointer">
                  <div className="flex flex-col space-y-4 animate-pulse">
                    <div className="bg-gray-300 h-[300px] w-full rounded-lg"></div>
                    <div className="bg-gray-300 h-4 w-1/3 rounded-lg"></div>
                    <div className="bg-gray-300 h-6 w-3/4 rounded-lg"></div>
                    <div className="flex space-x-3 items-center mt-5">
                      <div className="bg-gray-300 h-6 w-20 rounded-lg"></div>
                      <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full justify-center py-14">
      <h3 className="uppercase text-4xl flex md:flex-col md:space-y-1 md:space-x-0 space-x-1 border-l-2 border-l-primary/10 pl-4 pt-10">
        <span className="tracking-wide text-primary">recent</span>
        <span className="tracking-wide text-gray-500">articles</span>
      </h3>
      <div className="w-full">
        <div className="mt-20">
          <div className="grid md:grid-cols-3 lg:gap-20 md:gap-10 gap-5">
            {maps.map((map) => (
              <div key={map?.id} className="cursor-pointer md:pb-0 pb-20">
                <div className="flex flex-col space-y-4">
                  <ProjectImage src={map?.banner?.url} alt={map.title} />
                  <div className="w-full space-y-3">
                    <p className="font-light text-sm">
                      {formatDate(map?.created_at)}
                    </p>
                    <p className="text-2xl md:leading-normal pr-20">
                      {map?.title}
                    </p>
                  </div>
                  <Link
                    href={`/data/${map?.id}`}
                    className="flex space-x-3 items-center uppercase font-semibold mt-5"
                  >
                    <span className="md:tracking-tighter">Read More</span>
                    <FaPlus />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataList;
