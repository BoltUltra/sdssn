import React from 'react';
import { FaGithub, FaEnvelope, FaGlobe, FaTwitter } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi';
import { FiMoreHorizontal } from 'react-icons/fi';

// Sample user data
const sampleUserData = {
  name: 'Saurabh Rai',
  username: 'srbh077',
  bio: 'Software Developer | Dev Rel | Building ResumeMatcher.fyi | Working on AI Search 🔍',
  location: 'India',
  joinDate: 'Sep 25, 2019',
  email: 'srbh077@gmail.com',
  website: 'https://www.srbhr.com/',
  education: 'Computer Science (Bachelors Degree)',
  pronouns: 'He/Him',
  work: 'Software Developer, Dev Rel',
  badges: [
    { id: 1, count: 7, color: 'bg-pink-500' },
    { id: 2, count: 16, color: 'bg-blue-500' },
    { id: 3, count: 8, color: 'bg-yellow-500' },
    { id: 4, count: 4, color: 'bg-green-500' },
  ],
  organizations: [
    { name: 'Gitroom', role: 'Member' },
    { name: 'SWIRL', role: 'Contributor' },
    { name: 'Vector Podcast', role: 'Host' },
    { name: 'Resume Matcher', role: 'Founder' },
  ],
};

// Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

// Badge Component
const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${className}`}
    >
      {children}
    </span>
  );
};

// Profile Stats Component
const ProfileStats = ({ icon: Icon, text, href }) => {
  const content = (
    <div className="flex items-center gap-1 text-gray-400 hover:text-gray-300">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};

// Main Profile Component
const UserProfile = ({ userData = sampleUserData }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Banner */}
      <div className="h-32 bg-green-600" />

      <div className="max-w-4xl mx-auto px-4 -mt-16">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Profile Image */}
          <div className="absolute -top-12">
            <div className="h-24 w-24 rounded-full border-4 border-gray-900 overflow-hidden">
              <div className="h-full w-full bg-green-500/20" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <Badge className="bg-violet-500/20 text-violet-300">++</Badge>
              </div>
              <p className="text-gray-400 mt-1 max-w-2xl">{userData.bio}</p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition">
                Following
              </button>
              <button className="p-1 rounded-md bg-gray-800 hover:bg-gray-700 transition">
                <FiMoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Profile Meta */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <ProfileStats
              icon={HiOutlineLocationMarker}
              text={userData.location}
            />
            <ProfileStats
              icon={HiOutlineCalendar}
              text={`Joined on ${userData.joinDate}`}
            />
            <ProfileStats
              icon={FaEnvelope}
              text={userData.email}
              href={`mailto:${userData.email}`}
            />
            <ProfileStats
              icon={FaGlobe}
              text={userData.website}
              href={userData.website}
            />
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Education Card */}
          <Card>
            <div className="p-6">
              <h3 className="text-gray-400 mb-2">Education</h3>
              <p>{userData.education}</p>
            </div>
          </Card>

          {/* Pronouns Card */}
          <Card>
            <div className="p-6">
              <h3 className="text-gray-400 mb-2">Pronouns</h3>
              <p>{userData.pronouns}</p>
            </div>
          </Card>

          {/* Work Card */}
          <Card>
            <div className="p-6">
              <h3 className="text-gray-400 mb-2">Work</h3>
              <p>{userData.work}</p>
            </div>
          </Card>
        </div>

        {/* Badges Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4">
            {userData.badges.map((badge) => (
              <div
                key={badge.id}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color}/20`}
              >
                <span className="text-sm font-medium">{badge.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Organizations Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Organizations</h3>
          <div className="space-y-4">
            {userData.organizations.map((org, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-800" />
                <div>
                  <h4 className="font-medium">{org.name}</h4>
                  <p className="text-sm text-gray-400">{org.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
