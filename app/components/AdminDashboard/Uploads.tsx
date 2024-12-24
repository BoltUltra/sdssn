'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Button from '../Button';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import TextEditor from '../Editor';
import PublicProjectPanel from '../UserDashboard/PublicProjectPanel';
import PrivateProjectPanel from '../UserDashboard/PrivateProjectPanel';
import DraftProjectPanel from '../UserDashboard/DraftProjectPanel';
import ProjectUpload from './ProjectUpload';

const categories = [
  { name: 'Resources', value: 'resources' },
  { name: 'Certification', value: 'certification' },
  { name: 'Events and News', value: 'events-and-news' },
];

export default function Uploads() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial tab from query params
  const currentTab = searchParams.get('tab') || 'resources';

  // Map current tab to the tab index
  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/admin/dashboard/uploads?tab=${selectedTab}`, {
      scroll: false,
    });
  };

  const [formData, setFormData] = useState({
    file: null,
    category: '',
    title: '',
    description: '',
    editorContent: '',
    tags: '',
    status: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      editorContent: content,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
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
              <ProjectUpload />
            </TabPanel>
            <TabPanel>
              <PrivateProjectPanel />
            </TabPanel>
            <TabPanel>
              <DraftProjectPanel />
            </TabPanel>
            <TabPanel>
              <div className="md:mx-44 mt-8">
                <form className="space-y-8">
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
                        <p>Higher resolution recommended. (Max 2MB)</p>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <div className="form-input">
                      <select
                        name="category"
                        id="category"
                        className="w-full bg-transparent outline-none"
                        value={formData.category}
                        onChange={handleInputChange}
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
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <TextEditor
                      content={formData.description}
                      onContentChange={handleEditorChange}
                    />
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
                      value={formData.tags}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <div className="form-input">
                      <select
                        name="category"
                        id="category"
                        className="w-full bg-transparent outline-none"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="">Status</option>
                        <option value="maps">Draft</option>
                        <option value="discussions">Private</option>
                        <option value="links">Public</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-4 justify-end mt-10">
                    <Button
                      text="Upload Project"
                      className=""
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
