import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { IoMdShare } from 'react-icons/io';
import { MdAnalytics } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { SlOptionsVertical } from 'react-icons/sl';

const MapCard = ({ map }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();

  const goToUpdate = () => {
    router.push(`/dashboard/projects/${map.id}`);
  };
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (event.target.closest(`[data-dropdown-id="${map.id}"]`) === null) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [map.id]);

  return (
    <div key={map.id}>
      <div className="text-center">
        <Image
          src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
          alt={map.title}
          className="w-full rounded-t-lg"
          height={250}
          width={250}
        />
        <div className="bg-[#D9D9D9] flex items-center justify-between p-5 -mt-1 rounded-b-lg">
          <div className="text-center">
            <p className="font-semibold">{map.title}</p>
          </div>
          <div className="relative" data-dropdown-id={map.id}>
            <button
              className="flex items-center"
              onClick={(event) => {
                event.stopPropagation();
                setActiveDropdown(map.id);
              }}
            >
              <SlOptionsVertical />
            </button>
            {activeDropdown === map.id && (
              <div
                className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-md overflow-hidden"
                style={{
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: 1,
                  visibility: 'visible',
                }}
              >
                <div className="text-sm text-gray-700">
                  <button className="flex items-center p-3 space-x-3 hover:text-white hover:bg-primary w-full">
                    <SiPrivateinternetaccess />
                    <span>Make Private</span>
                  </button>
                  <button className="flex items-center p-3 space-x-3 hover:text-white hover:bg-primary w-full">
                    <MdAnalytics />
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={goToUpdate}
                    className="flex items-center p-3 space-x-3 hover:text-white hover:bg-primary w-full"
                  >
                    <CiEdit />
                    <span>Update</span>
                  </button>
                  <button className="flex items-center p-3 space-x-3 hover:text-white hover:bg-primary w-full">
                    <RiDeleteBin6Fill />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
