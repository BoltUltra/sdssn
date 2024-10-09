"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PublicProjectPanel from "./PublicProjectPanel";
import PrivateProjectPanel from "./PrivateProjectPanel";
import DraftProjectPanel from "./DraftProjectPanel";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import { RiUploadCloud2Fill } from "react-icons/ri";
import ButtonSecondary from "../ButtonSecondary";

const categories = [
  { name: "Public", value: "public" },
  { name: "Private", value: "private" },
  { name: "Draft", value: "draft" },
  { name: "Upload Project", value: "upload" },
];

export default function Project() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial tab from query params
  const currentTab = searchParams.get("tab") || "public";

  // Map current tab to the tab index
  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/dashboard/projects?tab=${selectedTab}`, { scroll: false });
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full">
        <TabGroup selectedIndex={currentTabIndex} onChange={handleTabChange}>
          <TabList className="flex md:gap-16 gap-10 border-b border-b-primary pb-6">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-6">
            <TabPanel>
              <PublicProjectPanel />
            </TabPanel>
            <TabPanel>
              <PrivateProjectPanel />
            </TabPanel>
            <TabPanel>
              <DraftProjectPanel />
            </TabPanel>
            <TabPanel>
              <div className="md:mx-44 mt-8">
                <form action="" className="space-y-8">
                  <div>
                    <label
                      htmlFor="file"
                      className="file-style cursor-pointer text-center p-5 rounded-2xl flex flex-col items-center justify-center space-y-6 bg-background text-primary"
                    >
                      <RiUploadCloud2Fill size={70} />
                      <div className="space-y-2 md:text-base text-sm">
                        <p className="md:text-xl text-base font-semibold">
                          Upload Photo
                        </p>
                        <p>Higher resolution recommended. (Max 5MB)</p>
                      </div>
                    </label>
                    <input type="file" id="file" className="hidden" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <div className="form-input">
                      <select
                        name="category"
                        id="category"
                        className="w-full bg-transparent"
                      >
                        <option value="">Category</option>
                        <option value="maps">Maps</option>
                        <option value="discussions">Discussions</option>
                        <option value="links">Links</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="form-input"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      cols={5}
                      rows={3}
                      className="form-input"
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="tags" className="form-label">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      className="form-input"
                    />
                  </div>
                </form>
                <div className="flex md:flex-row flex-col items-center gap-4 justify-end mt-10">
                  <Button
                    text="Upload Project"
                    onClick={() => {}}
                    className=""
                  />
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
