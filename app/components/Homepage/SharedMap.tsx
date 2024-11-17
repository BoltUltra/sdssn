import { map, user } from '@/public/images';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Heading3 from '../Heading3';
import { CiShare2 } from 'react-icons/ci';
import { FaHeart, FaRegComment } from 'react-icons/fa';
import { useDataStore } from '@/app/stores/dataStore';
import Link from 'next/link';

// Skeleton component
const MapSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-[300px] rounded-t-lg"></div>
    <div className="bg-gray-300 p-5 -mt-1 rounded-b-lg">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const SharedMap = () => {
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { fetchAllPosts } = useDataStore();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetchAllPosts();
      const mapPost = response.data
        .filter((post) => post.category === 'map')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Artificial delay
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setMaps(mapPost);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayedMaps = showAll ? maps : maps.slice(0, 6);

  return (
    <div>
      <section className="bg-[#F8F8F8]">
        <div className="section-container">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Heading3 text={'Maps Shared By members '} />
            <div className="h-0.5 w-40 bg-[#C30711]"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {isLoading
              ? // Show 6 skeleton loaders while loading
                [...Array(6)].map((_, index) => <MapSkeleton key={index} />)
              : displayedMaps.map((map) => (
                  <div key={map.id} className="text-center">
                    <Image
                      src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
                      alt={map.title}
                      height={300}
                      width={140}
                      quality={80}
                      className="object-cover h-[300px] object-center w-full rounded-t-lg"
                    />
                    <div className="bg-[#D9D9D9] flex items-center justify-between p-5 -mt-1 rounded-b-lg">
                      <Link href={`/data/${map?.id}`} className="text-center">
                        <p className="font-semibold text-lg">{map.title}</p>
                        <p className="text-sm">{map.username}</p>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          {!isLoading && maps.length > 6 && !showAll && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                See More Maps
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SharedMap;
