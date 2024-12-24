'use client';

import React, { useState, useEffect } from 'react';
import { IoMdShare } from 'react-icons/io';
import { MdAnalytics } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { SlOptionsVertical } from 'react-icons/sl';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';

const DiscussionCard = ({ discussion }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const goToUpdate = () => {
    router.push(`/dashboard/projects/${discussion.id}`);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        event.target.closest(`[data-dropdown-id="${discussion.id}"]`) === null
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [discussion.id]);

  const sliceHTML = (html, maxLength) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';
    text = text.slice(0, maxLength);
    return text + (text.length >= maxLength ? '...' : '');
  };

  const sanitizedHTML = DOMPurify.sanitize(discussion.description);
  const slicedContent = sliceHTML(sanitizedHTML, 100);

  const handleArticleClick = (e) => {
    if (!e.target.closest('[data-dropdown-id]')) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div key={discussion.id}>
        <div className="max-w-4xl">
          <div
            className="bg-background flex items-center justify-between p-5 -mt-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleArticleClick}
          >
            <div className="flex items-center md:space-x-5 py-4">
              <Image
                src={discussion?.banner?.url}
                alt="Article image"
                width={200}
                height={200}
                className="object-cover md:block hidden"
              />
              <div className="space-y-2">
                <p className="font-semibold">{discussion.title}</p>
                <div
                  className="md:pr-20 my-2 md:text-sm text-base text-justify"
                  dangerouslySetInnerHTML={{ __html: slicedContent }}
                />
              </div>
            </div>
            <div className="relative" data-dropdown-id={discussion.id}>
              <button
                className="flex items-center"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveDropdown(discussion.id);
                }}
              >
                <SlOptionsVertical />
              </button>
              {activeDropdown === discussion.id && (
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

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl h-[80%] overflow-y-auto w-full mx-4 transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{discussion.title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {discussion?.banner?.url && (
              <div className="mb-4">
                <Image
                  src={discussion.banner.url}
                  alt="Article image"
                  width={700}
                  height={400}
                  className="object-cover w-full rounded-lg"
                />
              </div>
            )}

            <div
              className="prose max-w-none mb-6 article-description space-y-5 text-justify my-10"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={goToUpdate}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center space-x-2"
              >
                <CiEdit />
                <span>Edit Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscussionCard;
