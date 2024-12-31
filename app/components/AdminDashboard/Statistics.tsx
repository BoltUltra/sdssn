'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';
import { CiMicrophoneOn, CiShare2 } from 'react-icons/ci';
import { MdArticle, MdAudiotrack, MdOutlinePublic } from 'react-icons/md';
import { IoVideocam } from 'react-icons/io5';
import { AiFillLike, AiOutlineComment } from 'react-icons/ai';
import { FaMapMarkedAlt, FaRegEye, FaUsers } from 'react-icons/fa';
import { GrProjects, GrUserAdmin } from 'react-icons/gr';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';

const Statistics = () => {
  const [resources, setResources] = useState({});
  const { fetchResources } = useDataStore();

  // Fetch data
  const fetchStats = async () => {
    try {
      const response = await fetchResources();
      setResources(response.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      toast.error(error.message || 'Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Loading
  if (!resources) return <Loading />;

  return (
    <div className="">
      <h3 className="text-4xl font-bold py-5">Statistics</h3>
      <div className="bg-primary/10 md:p-10 rounded-lg mb-10">
        <h3 className="text-2xl font-bold py-5">Podcasts</h3>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Podcasts
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.total}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <CiMicrophoneOn size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Audio Podcasts
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.audios}
                  </h2>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-700">
                  <MdAudiotrack size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Video Podcasts
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.videos}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <IoVideocam size="24" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Likes
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.likes}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <AiFillLike size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Comments
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.comments}
                  </h2>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-700">
                  <AiOutlineComment size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Shares
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.shares}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <CiShare2 size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Views
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.podcasts?.views}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <FaRegEye size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/10 md:p-10 rounded-lg mb-10">
        <h3 className="text-2xl font-bold py-5">Projects</h3>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total projects
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.total}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <GrProjects size={24} />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Public projects
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.public}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <MdOutlinePublic size={24} />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Private projects
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.private}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <RiGitRepositoryPrivateFill size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Discussions
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.discussions}
                  </h2>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-700">
                  <MdArticle size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Maps
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.maps}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <FaMapMarkedAlt size="24" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Likes
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.likes}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <AiFillLike size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Comments
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.comments}
                  </h2>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-yellow-700">
                  <AiOutlineComment size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Shares
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.shares}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <CiShare2 size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Views
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.projects?.views}
                  </h2>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-green-700">
                  <FaRegEye size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary/10 md:p-10 rounded-lg mb-10">
        <h3 className="text-2xl font-bold py-5">Users</h3>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Users
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.users?.total}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <FaUsers size={24} />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <span className="text-sm uppercase font-semibold tracking-wider">
                Total Admins
              </span>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {resources?.users?.admins}
                  </h2>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-blue-700">
                  <GrUserAdmin size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
