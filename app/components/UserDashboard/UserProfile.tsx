import { teammember, user1 } from '@/public/images';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';
import Loading from '../Loading';
import { GrCloudUpload } from 'react-icons/gr';
import { ImSpinner9 } from 'react-icons/im';

const UserProfile = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userSocials, setUserSocials] = useState({});
  const { fetchUserProfile, fetchUserSocials, updateUserImage } =
    useDataStore();

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetchUserProfile();
      setCurrentUser(response.data);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      toast.error(error.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const getUserSocials = async () => {
    setLoading(true);
    try {
      const response = await fetchUserSocials();
      setUserSocials(response.data);
    } catch (error: any) {
      console.error('Error fetching user socials:', error);
      toast.error(error.message || 'Failed to fetch user socials');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast.error('Please select an image to upload');
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await updateUserImage(selectedImage);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserSocials();
  }, []);

  const goToEditProfile = () => {
    router.push('/dashboard/profile/edit-profile');
  };
  const goToEditSocials = () => {
    router.push('/dashboard/profile/edit-social-links');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="md:px-20">
      <div className="profile-image-uploader flex items-center">
        <div className="flex items-center space-x-4">
          <Image
            src={
              previewImage ||
              currentUser?.picture?.asset?.url ||
              `https://api.dicebear.com/9.x/identicon/svg?seed=${currentUser?.first_name}`
            }
            alt="user image"
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
            unoptimized
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </div>
        <div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-primary text-white fon-light px-10 py-3 rounded-lg md:block hidden"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-primary text-white fon-light px-5 py-3 rounded-lg md:hidden"
          >
            {loading ? (
              <ImSpinner9 className="animate-spin" />
            ) : (
              <GrCloudUpload />
            )}
          </button>
        </div>
      </div>

      {/* 
      <div
        className="relative h-20 w-20 rounded-full"
        onClick={handleImageClick}
      >
        <div
          className={`relative h-20 w-20 ${isUploading ? 'opacity-50' : ''}`}
        >
          <Image
            src={
              currentUser?.image
                ? user1
                : `https://api.dicebear.com/9.x/identicon/svg?seed=${currentUser?.first_name}`
            }
            alt="user image"
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
            unoptimized
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <span className="absolute bottom-0 right-0 bg-white h-5 w-5 p-1 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
          <LuPencilLine />
        </span>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div> */}

      {/* Rest of the component remains the same */}
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Personal Information</p>
        <div className="grid md:grid-cols-2 gap-8 mt-5">
          <div className="flex flex-col space-y-2">
            <p className="form-label">Full Name</p>
            <p id="fullName" className="">
              {currentUser
                ? `${currentUser?.first_name} ${currentUser?.last_name}`
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Username</p>
            <p id="username" className="">
              {currentUser?.name}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Email</p>
            <p id="email" className="">
              {currentUser?.email}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Phone Number</p>
            <p id="phone_number" className="">
              {currentUser?.phone_number !== null
                ? currentUser?.phone_number
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Date of Birth</p>
            <p id="dob" className="">
              {currentUser?.dob !== null ? currentUser?.dob : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Gender</p>
            <p id="gender" className="capitalize">
              {currentUser?.gender !== null ? currentUser?.gender : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Profession</p>
            <p id="gender" className="">
              {currentUser?.profession !== null
                ? currentUser?.profession
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Organization</p>
            <p id="gender" className="">
              {currentUser?.organization !== null
                ? currentUser?.organization
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Organization Category</p>
            <p id="gender" className="">
              {currentUser?.organization_category !== null
                ? currentUser?.organization_category
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Organization Role</p>
            <p id="gender" className="">
              {currentUser?.organization_role !== null
                ? currentUser?.organization_role
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Country</p>
            <p id="gender" className="">
              {currentUser?.country !== null ? currentUser?.country : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">State</p>
            <p id="state" className="">
              {currentUser?.state !== null ? currentUser?.state : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">City</p>
            <p id="state" className="">
              {currentUser?.city !== null ? currentUser?.city : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Address</p>
            <p id="address" className="">
              {currentUser?.address !== null ? currentUser?.address : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Membership Status</p>
            <p id="membership_status" className="capitalize">
              {`${currentUser?.membership_status}` || 'Null'}
            </p>
          </div>
        </div>
        <Button
          text="Edit Profile"
          className="mt-10 text-white"
          onClick={goToEditProfile}
        />
      </div>
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Social Links</p>
        <div className="grid md:grid-cols-2 gap-8 mt-5">
          <div className="flex flex-col space-y-2">
            <p className="form-label">Twitter</p>
            <p id="twitter" className="">
              {userSocials?.twitter !== null ? userSocials?.twitter : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Instagram</p>
            <p id="instagram" className="">
              {userSocials?.instagram !== null
                ? userSocials?.instagram
                : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Facebook</p>
            <p id="facebook" className="">
              {userSocials?.facebook !== null ? userSocials?.facebook : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">LinkedIn</p>
            <p id="linkedin" className="">
              {userSocials?.linkedin !== null ? userSocials?.linkedin : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">GitHub</p>
            <p id="github" className="">
              {userSocials?.github !== null ? userSocials?.github : 'Null'}
            </p>
          </div>
        </div>
      </div>
      <Button
        text="Edit Socials"
        className="mt-10 text-white"
        onClick={goToEditSocials}
      />
    </div>
  );
};

export default UserProfile;
