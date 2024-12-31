'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';
import { Button, Dialog, DialogPanel } from '@headlessui/react';
import { PiConfettiThin } from 'react-icons/pi';
import TextEditor from '@/app/components/Editor';

export default function UpdateProject() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { updatePost, fetchSingleArticle } = useDataStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const goToProjects = () => {
    router.push('/dashboard/projects');
    close();
  };

  const [formData, setFormData] = useState({
    banner: null,
    category: '',
    title: '',
    description: '',
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
      await updatePost(id, formData);
      setIsOpen(true);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticleDetails = async (id: string) => {
    try {
      const response = await fetchSingleArticle(id);
      setArticle(response.data);
      // Initialize formData with fetched article data
      setFormData({
        banner: null,
        category: response.data.category || '',
        title: response.data.title || '',
        description: response.data.description || '',
        tags: response.data.tags || '',
        status: response.data.status || '',
      });
      setEditorContent(response.data.description || '');
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetails(id);
  }, []);

  return (
    <>
      <p>
        Update article {id}: {formData.title}
      </p>
      <div className="flex w-full justify-center px-4">
        <div className="w-full">
          <div>
            <div className="mt-6">
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
                        disabled
                      >
                        <option value="">Category</option>
                        <option value="map">Maps</option>
                        <option value="discussion">Discussions</option>
                        <option value="link">Links</option>
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
                      key={editorContent}
                      content={editorContent}
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
                        name="status"
                        id="category"
                        className="w-full bg-transparent outline-none"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="">Status</option>
                        <option value="draft">Draft</option>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-4 justify-end mt-10">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className={`flex items-center justify-center space-x-3 bg-primary text-white py-4 px-10 md:w-fit w-full rounded-lg ${
                        isLoading ? 'bg-primary/50' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="loader"></div>
                      ) : (
                        'Update Project'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
                  <span className="font-semibold">"{formData.title}"</span> has
                  been updated successfully.
                </h3>
              </div>
              <div className="mt-10 flex items-center justify-end">
                <button
                  className="bg-primary border border-primary py-3 rounded-md text-white w-full md:mx-20 mx-5"
                  onClick={goToProjects}
                >
                  Go To Discussion
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
