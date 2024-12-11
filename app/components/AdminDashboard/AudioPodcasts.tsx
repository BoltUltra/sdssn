import React, { useState } from 'react';
import Loading from '../Loading';
import Button from '../Button';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const PodcastModal = ({ audioPodcast, onClose }) => {
  if (!audioPodcast) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full h-[80%] flex items-start rounded-lg">
        <div className="bg-white p-6 rounded-lg overflow-hidden h-full overflow-y-scroll w-full">
          <h2 className="text-2xl font-bold mb-4">{audioPodcast.title}</h2>
          <div className="mb-4">
            <p>
              <strong>Created by:</strong>{' '}
              {`${audioPodcast?.user?.first_name} ${audioPodcast?.user?.last_name}`}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(audioPodcast?.created_at)}
            </p>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(audioPodcast?.description)}
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

const AudioPodcasts = ({ audioPodcasts }) => {
  const router = useRouter();
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const goToUpload = () => {
    router.push('/admin/dashboard/uploads');
  };

  const handleRowClick = (audioPodcast) => {
    setSelectedPodcast(audioPodcast);
  };

  if (!audioPodcasts) return <Loading />;

  if (audioPodcasts.length === 0) {
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
            {audioPodcasts.map((audioPodcast) => (
              <tr
                key={audioPodcast.id}
                onClick={() => handleRowClick(audioPodcast)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{audioPodcast?.title}</td>
                <td className="px-6 py-4">
                  {`${audioPodcast?.user?.first_name} ${audioPodcast?.user?.last_name}`}
                </td>
                <td className="px-6 py-4">
                  {formatDate(audioPodcast?.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPodcast && (
        <PodcastModal
          audioPodcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </>
  );
};

export default AudioPodcasts;
