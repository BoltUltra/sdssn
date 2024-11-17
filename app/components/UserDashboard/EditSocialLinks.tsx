import React, { useState, useEffect } from 'react';
import { useDataStore } from '@/app/stores/dataStore';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const EditSocialLinks = () => {
  const { editUserSocials, fetchUserSocials } = useDataStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    twitter: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    github: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserSocials();
        const userData = response.data;
        console.log('userData', userData);

        setFormData({
          twitter: userData?.twitter || '',
          instagram: userData?.instagram || '',
          facebook: userData?.facebook || '',
          linkedin: userData?.linkedin || '',
          github: userData?.github || '',
        });
      } catch (error) {
        toast.error('Failed to load user data');
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [fetchUserSocials]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await editUserSocials(formData);
      localStorage.setItem('currentUserSocials', JSON.stringify(formData));
      toast.success('Social links updated successfully');
    } catch (error) {
      toast.error('Failed to update social links');
      console.error('Error updating social links:', error);
    } finally {
      setIsLoading(false);
      router.push('/dashboard/profile');
    }
  };

  return (
    <>
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Social Links</p>
        <div className="grid md:grid-cols-2 gap-8 mt-5">
          <div className="flex flex-col space-y-2">
            <label className="form-label">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
        <Button
          text={isLoading ? <div className="loader"></div> : 'Save'}
          className={`${
            isLoading ? 'bg-primary/50 mt-10' : 'mt-10'
          } "mt-10 text-white"`}
          onClick={handleSave}
        ></Button>
      </div>
    </>
  );
};

export default EditSocialLinks;
