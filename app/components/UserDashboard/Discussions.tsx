import React from 'react';
import Loading from '../Loading';
import Button from '../Button';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import DiscussionCard from './DiscussionCard';

const Discussions = ({ discussions, isLoading }) => {
  const router = useRouter();
  const goToUpload = () => {
    router.push('/dashboard/projects?tab=upload');
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  // Show empty state if no discussions
  if (!discussions || discussions.length === 0) {
    return (
      <div className="text-center flex flex-col space-y-4 items-center mt-72">
        <h3 className="md:text-2xl text-xl">Upload your project</h3>
        <p className="max-w-sm mx-auto">
          Click the button below to upload your best work and be part of a
          growing community.
        </p>
        <Button
          text="Upload a discussion"
          icon={<MdAdd />}
          onClick={goToUpload}
        />
      </div>
    );
  }

  // Show discussions grid when data is loaded
  return (
    <div className="grid gap-6">
      {discussions.map((discussion) => (
        <DiscussionCard key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
};

export default Discussions;
