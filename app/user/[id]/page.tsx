'use client';

import React, { useEffect, useState } from 'react';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { useDataStore } from '@/app/stores/dataStore';
import { useParams } from 'next/navigation';
import { MdEmail, MdLocationOn, MdPhone, MdWork } from 'react-icons/md';
import Image from 'next/image';
import { Footer, Header, Loading } from '@/app/components';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import Link from 'next/link';

const UserProfile = () => {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState([]);
  const { fetchUser } = useDataStore();
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (id: string) => {
    try {
      const response = await fetchUser(id);
      console.log('Fetched user:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile(id);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <div className="pt-44 pb-20 bg-background px-4 sm:px-6 lg:px-8">
        <div className="section-container mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                className="h-48 w-full object-cover md:w-48"
                src={
                  user?.picture?.asset?.url ||
                  `https://api.dicebear.com/9.x/identicon/svg?seed=${user?.first_name}`
                }
                alt={`${user?.first_name} ${user?.last_name}`}
                height={200}
                width={200}
                unoptimized
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {user?.profession}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 flex items-center space-x-3">
                <span>
                  {user?.first_name} {user?.last_name}{' '}
                </span>
                {user?.membership_status === 'free' && (
                  <RiVerifiedBadgeFill color="#ECECEC" />
                )}
              </h1>
              <p className="mt-2 text-gray-500">@{user?.name}</p>
              {/* <p className="mt-2 text-gray-500 capitalize">
                {user?.membership_status} member
              </p> */}
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MdEmail className="text-gray-600 mr-2" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center">
                <MdPhone className="text-gray-600 mr-2" />
                <span>{user?.phone_number}</span>
              </div>
              <div className="flex items-center">
                <MdLocationOn className="text-gray-600 mr-2" />
                {/* <span>{`${user?.address}, ${user?.city}, ${user?.state}, ${user?.country}`}</span> */}
                <span>{`${user?.country}`}</span>
              </div>
              <div className="flex items-center">
                <MdWork className="text-gray-600 mr-2" />
                <span>{`${user?.organization_role}`}</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Social Links
            </h2>
            <div className="flex space-x-4">
              <a
                href={user?.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaGithub size={24} />
              </a>
              <a
                href={user?.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={user?.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={user?.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={user?.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          <div className="px-8 py-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                  <Link
                    href={
                      project.category === 'map'
                        ? `/data/${project.id}`
                        : project.category === 'discussion'
                        ? `/articles/${project.id}`
                        : `/projects/${project.id}`
                    }
                    className="hover:underline underline-offset-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1 capitalize">
                    Category: {project.category}
                  </p>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Views: {project.views}</span>
                    <span>Likes: {project.likes}</span>
                    <span>Shares: {project.shares}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
