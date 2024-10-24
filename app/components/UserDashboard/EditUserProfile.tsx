import { teammember, user1 } from "@/public/images";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { LuPencilLine } from "react-icons/lu";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/app/stores/dataStore";
import toast, { Toaster } from "react-hot-toast";

const EditUserProfile = () => {
  const router = useRouter();
  const { editUserProfile, updateUserImage } = useDataStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Define state for form fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState("");
  const [answer, setAnswer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userImage = JSON.parse(localStorage.getItem("userImage") || "{}");

  // useEffect to load data from localStorage on component mount
  useEffect(() => {
    // Populate the state with the values from localStorage
    setFullName(currentUser?.fullName || "");
    setUsername(currentUser?.username || "");
    setEmail(currentUser?.email || "");
    setDateOfBirth(currentUser?.dateOfBirth || "");
    setLocation(currentUser?.location || "");
    setMembershipStatus(currentUser?.membership || "Free");
    setTwitter(currentUser?.twitter || "");
    setInstagram(currentUser?.instagram || "");
    setFacebook(currentUser?.facebook || "");
    setLinkedIn(currentUser?.linkedIn || "");
    setGithub(currentUser?.github || "");
    setSecurityQuestions(currentUser?.securityQuestions || "");
    setAnswer(currentUser?.answer || "");
    setPhoneNumber(currentUser?.phoneNumber || "");
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);

      console.log("Selected file:", file); // Debug log

      if (!file) {
        throw new Error("No file selected");
      }

      const result = await updateUserImage({
        file,
      });

      if (result.success) {
        const updatedUser = {
          ...currentUser,
          profileImage: result.data.imageUrl, // adjust based on your API response structure
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        toast.success("Image uploaded successfully");
      } else {
        throw new Error(result.error || "Failed to upload image");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
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

  const handleSave = async () => {
    const updatedUser = {
      fullName,
      username,
      email,
      dateOfBirth,
      location,
      membershipStatus,
      twitter,
      instagram,
      facebook,
      linkedIn,
      github,
      securityQuestions,
      answer,
      phoneNumber,
    };
    setIsLoading(true);
    try {
      console.log(updatedUser);
      await editUserProfile(updatedUser);
      setTimeout(() => {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        router.push("/dashboard/profile");
      }, 2000);
    } catch (error) {
      toast.error("An error occurred, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <Toaster />
      <div className="md:px-20">
        <div
          className="relative h-20 w-20 rounded-full"
          onClick={handleImageClick}
        >
          <div
            className={`relative h-20 w-20 ${isUploading ? "opacity-50" : ""}`}
          >
            <Image
              src={
                userImage === "No Profile Image is Avaialable"
                  ? user1
                  : userImage
              }
              alt="user image"
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
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
        </div>
        <div className="mt-10">
          <p className="text-2xl font-semibold mt-4">Personal Information</p>
          <div className="md:grid grid-cols-2 gap-8 mt-5">
            <div className="flex flex-col space-y-2">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Date of Birth</label>
              <input
                min="1900-01-01"
                max="2010-12-31"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Membership Status</label>
              <input
                type="text"
                value={membershipStatus}
                onChange={(e) => setMembershipStatus(e.target.value)} // Update state
                className="form-input"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-2xl font-semibold mt-4">Social Links</p>
          <div className="md:grid grid-cols-2 gap-8 mt-5">
            <div className="flex flex-col space-y-2">
              <label className="form-label">Twitter</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">LinkedIn</label>
              <input
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)} // Update state
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">GitHub</label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)} // Update state
                className="form-input"
              />
            </div>
          </div>
        </div>
        <Button
          text={isLoading ? <div className="loader"></div> : "Save"}
          className={`${
            isLoading ? "bg-primary/50 mt-10" : "mt-10"
          } "mt-10 text-white"`}
          onClick={handleSave} // Call save handler
        ></Button>
      </div>
    </>
  );
};

export default EditUserProfile;
