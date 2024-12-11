import React, { useState } from 'react';
import Loading from '../Loading';
import Button from '../Button';
import { MdAdd, MdCheck, MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { formatDate, sanitizeHTML } from '@/app/helpers';
import { useDataStore } from '@/app/stores/dataStore';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const DiscussionModal = ({ discussion, onClose }) => {
  if (!discussion) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full h-[80%] flex items-start rounded-lg">
        <div className="bg-white p-6 rounded-lg overflow-hidden h-full overflow-y-scroll w-full">
          <h2 className="text-2xl font-bold mb-4">{discussion.title}</h2>
          <div className="mb-4">
            <p>
              <strong>Created by:</strong>{' '}
              {`${discussion?.user?.first_name} ${discussion?.user?.last_name}`}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(discussion?.created_at)}
            </p>
            <div
              dangerouslySetInnerHTML={sanitizeHTML(discussion?.description)}
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

const AwaitingApprovalDiscussion = ({ discussions }) => {
  const router = useRouter();
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { approveProject } = useDataStore();

  const goToUpload = () => {
    router.push('/dashboard/projects?tab=upload');
  };

  const handleApprove = async (id, e) => {
    e.stopPropagation();
    // setIsLoading(true);
    alert('Approving project');
    try {
      await approveProject(id);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    // Add your delete logic here
    console.log('Delete discussion:', id);
  };

  const handleRowClick = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  if (!discussions) return <Loading />;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loading />
      </div>
    );
  }

  if (discussions.length === 0) {
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
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discussions.map((discussion) => (
              <tr
                key={discussion.id}
                onClick={() => handleRowClick(discussion)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{discussion?.title}</td>
                <td className="px-6 py-4">
                  {`${discussion?.user?.first_name} ${discussion?.user?.last_name}`}
                </td>
                <td className="px-6 py-4">
                  {formatDate(discussion?.created_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleApprove(discussion?.id, e)}
                      className="bg-green-500 hover:bg-green-600 p-1 rounded-full text-white"
                    >
                      <MdCheck />
                    </button>
                    <button
                      onClick={(e) => handleDelete(discussion?.id, e)}
                      className="bg-red-500 hover:bg-red-600 p-1 rounded-full text-white"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDiscussion && (
        <DiscussionModal
          discussion={selectedDiscussion}
          onClose={() => setSelectedDiscussion(null)}
        />
      )}
    </>
  );
};

export default AwaitingApprovalDiscussion;
