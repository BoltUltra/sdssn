import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoMdShare } from "react-icons/io";
import { MdAnalytics } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { SiPrivateinternetaccess } from "react-icons/si";
import { SlOptionsVertical } from "react-icons/sl";

const LinkCard = ({ link }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (event.target.closest(`[data-dropdown-id="${link.id}"]`) === null) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [link.id]);

  return (
    <div key={link.id}>
      <div className="max-w-4xl">
        <div className="bg-background flex items-center justify-between md:p-10 p-5 -mt-1 rounded-lg">
          <div className="space-y-2">
            <p className="font-semibold">{link.subject}</p>
            <Link href={link.link}>{link.link}</Link>
          </div>
          <div className="relative" data-dropdown-id={link.id}>
            <button
              className="flex items-center"
              onClick={(event) => {
                event.stopPropagation();
                setActiveDropdown(link.id);
              }}
            >
              <SlOptionsVertical />
            </button>
            {activeDropdown === link.id && (
              <div
                className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-md overflow-hidden"
                style={{
                  transition: "opacity 0.3s ease-in-out",
                  opacity: 1,
                  visibility: "visible",
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
                  <button className="flex items-center p-3 space-x-3 hover:text-white hover:bg-primary w-full">
                    <IoMdShare />
                    <span>Share</span>
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

export default LinkCard;
