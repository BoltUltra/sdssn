import React, { useState } from 'react';
import Loading from '../Loading';
import Button from '../Button';
import { MdAdd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import ReactPlayer from 'react-player';

const PodcastModal = ({ videoPodcast, onClose }) => {
  if (!videoPodcast) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full h-[80%] flex items-start rounded-lg">
        <div className="bg-white p-6 rounded-lg overflow-hidden h-full overflow-y-scroll w-full">
          <h2 className="text-2xl font-bold mb-4">{videoPodcast.title}</h2>
          <div className="mb-4">
            <p>
              <strong>Created by:</strong>{' '}
              {`${videoPodcast?.user?.first_name} ${videoPodcast?.user?.last_name}`}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(videoPodcast?.created_at)}
            </p>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(videoPodcast?.description)}
              className="article-description space-y-5 text-justify my-10"
            ></div>
            <div className="w-full p-5">
              <ReactPlayer
                url={videoPodcast.video_url}
                width="100%"
                controls={true}
                playing={false}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
              />
            </div>
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

const VideoPodcasts = ({ videoPodcasts }) => {
  const router = useRouter();
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const goToUpload = () => {
    router.push('/admin/dashboard/uploads');
  };

  const handleRowClick = (videoPodcast) => {
    setSelectedPodcast(videoPodcast);
  };

  if (!videoPodcasts) return <Loading />;

  if (videoPodcasts.length === 0) {
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
            {videoPodcasts.map((videoPodcast) => (
              <tr
                key={videoPodcast.id}
                onClick={() => handleRowClick(videoPodcast)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{videoPodcast?.title}</td>
                <td className="px-6 py-4">
                  {`${videoPodcast?.user?.first_name} ${videoPodcast?.user?.last_name}`}
                </td>
                <td className="px-6 py-4">
                  {formatDate(videoPodcast?.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPodcast && (
        <PodcastModal
          videoPodcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </>
  );
};

export default VideoPodcasts;
