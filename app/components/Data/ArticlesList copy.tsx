import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import Heading4 from '../Heading4';
import { formatDate, truncateText } from '@/app/helpers';
import { FaPlus } from 'react-icons/fa';

const ArticlesList = ({ articles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (loading) {
    // Render skeleton loaders while loading
    return (
      <div className="w-full justify-center px-4 bg-primary rounded-xl text-white md:p-14">
        <Heading4 text="Latest Podcast Episodes" className="text-white" />
        <div className="mt-20 space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center animate-pulse cursor-pointer"
            >
              <div className="flex space-x-4 w-[75%] border-r-2 border-r-white pr-10 mr-10">
                {/* Image Skeleton */}
                <div className="bg-gray-300 w-[170px] h-[180px] rounded-lg"></div>
                <div className="w-full space-y-3">
                  {/* Title Skeleton */}
                  <div className="bg-gray-300 h-6 w-3/4 rounded-lg"></div>
                  {/* Description Skeleton */}
                  <div className="bg-gray-300 h-4 w-full rounded-lg"></div>
                  <div className="bg-gray-300 h-4 w-1/2 rounded-lg"></div>
                  {/* Tags Skeleton */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-gray-300 h-6 w-12 rounded-lg"></div>
                    <div className="bg-gray-300 h-6 w-16 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="w-[25%] space-y-2">
                {/* Byline Skeleton */}
                <div className="bg-gray-300 h-4 w-1/2 rounded-lg"></div>
                {/* Date Skeleton */}
                <div className="bg-gray-300 h-4 w-1/3 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full justify-center py-14">
      <h3 className="uppercase text-4xl flex md:flex-col md:space-y-1 md:space-x-0 space-x-1 border-l-2 border-l-primary/10 pl-4 pt-10">
        <span className="tracking-wide text-primary">recent</span>
        <span className="tracking-wide text-gray-500">articles</span>
      </h3>
      <div className="w-full">
        <div className="mt-20">
          <div className="grid md:grid-cols-3 lg:gap-20 md:gap-10 gap-5">
            {articles.map((article) => (
              <div key={article?.id} className="cursor-pointer">
                <div className="flex flex-col space-y-4">
                  <Image
                    src={`https://random-image-pepebigotes.vercel.app/api/random-image`}
                    alt={article.title}
                    height={300}
                    width={140}
                    quality={80}
                    className="object-cover h-[300px] object-center w-full"
                  />
                  <div className="w-full space-y-3">
                    <p className="font-light text-sm">
                      {formatDate(article?.created_at)}
                    </p>

                    <p className="text-2xl md:leading-normal pr-20">
                      {article?.title}
                    </p>
                    {/* <div
                      dangerouslySetInnerHTML={sanitizeHTML(
                        truncateText(article.description, 100)
                      )}
                      className="article-description"
                    ></div> */}
                    {/* <div className="flex flex-wrap gap-2 mt-2">
                      {article.tags?.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 rounded-lg text-sm capitalize"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div> */}
                  </div>

                  <button className="flex space-x-3 items-center uppercase font-semibold mt-5">
                    <span className="md:tracking-tighter">Read More</span>
                    <FaPlus />
                  </button>
                </div>
                {/* <div className="w-[25%]">
                  <p>By: {article.by || 'Unknown'}</p>
                  <p>Date: {formatDate(article.created_at)}</p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
