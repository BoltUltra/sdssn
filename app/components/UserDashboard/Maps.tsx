import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import MapCard from './MapCard';
import Button from '../Button';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const Maps = ({ maps, isLoading }) => {
  const router = useRouter();
  const goToUpload = () => {
    router.push('/dashboard/projects?tab=upload');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (!maps || maps.length === 0) {
    return (
      <div className="text-center flex flex-col space-y-4 items-center mt-72">
        <h3 className="md:text-2xl text-xl">Upload your project</h3>
        <p className="max-w-sm mx-auto">
          Click the button below to upload your best work and be part of a
          growing community.
        </p>
        <Button
          text="Upload your project"
          icon={<MdAdd />}
          onClick={goToUpload}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {maps.map((map) => (
        <MapCard map={map} key={map.id} />
      ))}
    </div>
  );
};

export default Maps;
