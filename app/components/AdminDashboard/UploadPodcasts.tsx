'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import TextEditor from '../Editor';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';
import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { PiConfettiThin } from 'react-icons/pi';

export default function UploadPodcasts() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createPodcast } = useDataStore();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const goToProjects = () => {
    router.push('/admin/dashboard/projects?tab=all-projects');
    close();
  };

  const [formData, setFormData] = useState({
    banner: null,
    category: 'map',
    title: '',
    description: '',
    tags: '',
    video_url: '',
    audio_url: '',
  });

  const isFormValid = () => {
    const baseValidation =
      formData.banner !== null &&
      formData.category !== '' &&
      formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.tags.trim() !== '';

    if (formData.category === 'video') {
      return baseValidation && formData.video_url !== '';
    } else if (formData.category === 'audio') {
      return baseValidation && formData.audio_url !== '';
    }

    return false;
  };

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
      banner: e.target.files[0],
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        banner: formData.banner,
        category: formData.category,
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        ...(formData.category === 'video'
          ? { video_url: formData.video_url }
          : {}),
        ...(formData.category === 'audio'
          ? { audio_url: formData.audio_url }
          : {}),
      };

      await createPodcast(submitData);
      setIsOpen(true);
    } catch (error) {
      toast.error('Failed to create podcast');
      console.error('Error creating podcast:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center px-4">
        <div className="w-full">
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
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
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
              {formData.category === 'video' && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="video_url" className="form-label">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="video_url"
                    id="video_url"
                    className="form-input"
                    value={formData.video_url}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              {formData.category === 'audio' && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="audio_url" className="form-label">
                    Audio URL
                  </label>
                  <input
                    type="text"
                    name="audio_url"
                    id="audio_url"
                    className="form-input"
                    value={formData.audio_url}
                    onChange={handleInputChange}
                  />
                </div>
              )}
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
              <div className="flex md:flex-row flex-col items-center gap-4 justify-end mt-10">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`flex items-center justify-center space-x-3 bg-primary text-white py-4 px-10 md:w-fit w-full rounded-lg ${
                    isLoading ? 'bg-primary/50' : ''
                  } ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="loader"></div>
                  ) : (
                    'Upload Podcast'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white py-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex items-center justify-end text-primary"></div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <PiConfettiThin size={60} />{' '}
                </div>
                <h3 className="md:text-3xl text-xl mt-4 md:px-20 px-3">
                  Congratulations! Your {formData.category},{' '}
                  <span className="font-semibold">"{formData.title}"</span> is
                  now {formData.status}!
                </h3>
              </div>
              <div className="mt-10 flex items-center justify-end">
                <button
                  className="bg-primary border border-primary py-3 rounded-md text-white w-full md:mx-20 mx-5"
                  onClick={goToProjects}
                >
                  Go To Projects
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
