import { teammember, user1 } from '@/public/images';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDataStore } from '@/app/stores/dataStore';

const UserProfile = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { updateUserImage } = useDataStore();
  const [currentUser, setCurrentUser] = useState(null);
  const [userSocials, setUserSocials] = useState(null);
  const { fetchUserProfile, fetchUserSocials } = useDataStore();

  const getUserProfile = async () => {
    try {
      const response = await fetchUserProfile();
      console.log(response);
    } catch (error: any) {
      console.error('Error fetching user profile:', error);
      toast.error(error.message || 'Failed to fetch user profile');
    }
  };
  const getUserSocials = async () => {
    try {
      const response = await fetchUserSocials();
      console.log(response);
    } catch (error: any) {
      console.error('Error fetching user socials:', error);
      toast.error(error.message || 'Failed to fetch user profile');
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage here only if on client side
      const storedUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      const storedSocials = JSON.parse(
        localStorage.getItem('currentUserSocials') || '{}'
      );
      setCurrentUser(storedUser);
      setUserSocials(storedSocials);
    }
    getUserProfile();
    getUserSocials();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);

      // console.log("Selected file:", file); // Debug log

      if (!file) {
        throw new Error('No file selected');
      }

      const result = await updateUserImage({
        file,
      });

      if (result.success) {
        const updatedUser = {
          ...currentUser,
          profileImage: result.data.imageUrl, // adjust based on your API response structure
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        toast.success('Image uploaded successfully');
      } else {
        throw new Error(result.error || 'Failed to upload image');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Upload image immediately when selected
      handleUpload(file);
    }
  };
  const goToEditProfile = () => {
    router.push('/dashboard/profile/edit-profile');
  };
  const goToEditSocials = () => {
    router.push('/dashboard/profile/edit-social-links');
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="md:px-20">
      <div
        className="relative h-20 w-20 rounded-full"
        onClick={handleImageClick}
      >
        <div
          className={`relative h-20 w-20 ${isUploading ? 'opacity-50' : ''}`}
        >
          <Image
            src={`https://api.dicebear.com/9.x/identicon/svg?seed=${currentUser?.first_name}`}
            alt="user image"
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
            unoptimized
          />
          {/* {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )} */}
        </div>
        {/* <span className="absolute bottom-0 right-0 bg-white h-5 w-5 p-1 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
          <LuPencilLine />
        </span> */}
        {/* <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        /> */}
      </div>

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
            <p id="gender" className="">
              {currentUser?.gender !== null ? currentUser?.gender : 'Null'}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">State</p>
            <p id="state" className="">
              {currentUser?.state !== null ? currentUser?.state : 'Null'}
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
