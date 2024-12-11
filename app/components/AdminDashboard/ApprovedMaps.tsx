import React, { useState } from 'react';
import Loading from '../Loading';
import Button from '../Button';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const MapModal = ({ map, onClose }) => {
  if (!map) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full h-[80%] flex items-start rounded-lg">
        <div className="bg-white p-6 rounded-lg overflow-hidden h-full overflow-y-scroll w-full">
          <h2 className="text-2xl font-bold mb-4">{map.title}</h2>
          <div className="mb-4">
            <p>
              <strong>Created by:</strong>{' '}
              {`${map?.user?.first_name} ${map?.user?.last_name}`}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(map?.created_at)}
            </p>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(map?.description)}
              className="article-description space-y-5 text-justify my-10"
            ></div>{' '}
          </div>
        </div>
        <div className="flex items-center justify-end text-white ml-5">
          <button onClick={onClose}>
            <IoMdCloseCircleOutline size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ApprovedMaps = ({ maps }) => {
  const router = useRouter();
  const [selectedMap, setSelectedMap] = useState(null);

  const goToUpload = () => {
    router.push('/dashboard/projects?tab=upload');
  };

  const handleRowClick = (map) => {
    setSelectedMap(map);
  };

  if (!maps) return <Loading />;

  if (maps.length === 0) {
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
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Created By</th>
              <th className="px-6 py-3 text-left">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {maps.map((map) => (
              <tr
                key={map.id}
                onClick={() => handleRowClick(map)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{map?.title}</td>
                <td className="px-6 py-4">
                  {`${map?.user?.first_name} ${map?.user?.last_name}`}
                </td>
                <td className="px-6 py-4">{formatDate(map?.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMap && (
        <MapModal map={selectedMap} onClose={() => setSelectedMap(null)} />
      )}
    </>
  );
};

export default ApprovedMaps;
