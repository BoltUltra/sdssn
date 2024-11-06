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
  const { editUserProfile, updateUserImage, fetchUserProfile } = useDataStore();
  const fileInputRef = useRef(null);

  // Define state for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dateOfBirth: "",
    address: "",
    state: "",
    gender: "",
    membershipStatus: "",
    phoneNumber: "",
    social: {
      twitter: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      github: "",
    },
    securityQuestions: "",
    answer: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First try to get user data from API
        // const userData = await fetchUserProfile();
        const response = await fetchUserProfile();
        const userData = response.data;
        console.log("User data:", userData);

        if (!userData) {
          // Fallback to localStorage if API fails
          const storedUser = localStorage.getItem("currentUser");
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setFormData({
              firstName: parsedUser.first_name || "",
              lastName: parsedUser.last_name || "",
              username: parsedUser.name || "",
              email: parsedUser.email || "",
              dateOfBirth: parsedUser.dob || "",
              address: parsedUser.address || "",
              state: parsedUser.state || "",
              gender: parsedUser.gender || "",
              membershipStatus: parsedUser.membership_status || "Free",
              phoneNumber: parsedUser.phone_number || "",
              social: {
                twitter: parsedUser.social?.twitter || "",
                instagram: parsedUser.social?.instagram || "",
                facebook: parsedUser.social?.facebook || "",
                linkedin: parsedUser.social?.linkedin || "",
                github: parsedUser.social?.github || "",
              },
              securityQuestions: parsedUser.security_question || "",
              answer: parsedUser.answer || "",
            });
          }
        } else {
          // Use API data if available
          setFormData({
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            username: userData.name || "",
            email: userData.email || "",
            dateOfBirth: userData.dob || "",
            address: userData.address || "",
            state: userData.state || "",
            gender: userData.gender || "",
            membershipStatus: userData.membership_status || "Free",
            phoneNumber: userData.phone_number || "",
            social: {
              twitter: userData.social?.twitter || "",
              instagram: userData.social?.instagram || "",
              facebook: userData.social?.facebook || "",
              linkedin: userData.social?.linkedin || "",
              github: userData.social?.github || "",
            },
            securityQuestions: userData.security_question || "",
            answer: userData.answer || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [fetchUserProfile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const socialField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Transform formData back to API expected format
      const updatedUser = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        name: formData.username,
        email: formData.email,
        dob: formData.dateOfBirth,
        address: formData.address,
        state: formData.state,
        gender: formData.gender,
        membership_status: formData.membershipStatus,
        phone_number: formData.phoneNumber,
        social: formData.social,
        security_question: formData.securityQuestions,
        answer: formData.answer,
      };

      await editUserProfile(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      router.push("/dashboard/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="md:px-20">
        <div className="relative h-20 w-20 rounded-full">
          <div
            className={`relative h-20 w-20 ${isUploading ? "opacity-50" : ""}`}
          >
            <Image
              src={`https://api.dicebear.com/9.x/identicon/svg?seed=${formData.first_name}`}
              alt="user image"
              className="w-20 h-20 rounded-full object-cover"
              width={80}
              height={80}
              unoptimized
            />
          </div>
        </div>
        <div className="mt-10">
          <p className="text-2xl font-semibold mt-4">Personal Information</p>
          <div className="md:grid grid-cols-2 gap-8 mt-5">
            <div className="flex flex-col space-y-2">
              <label className="form-label">First Name</label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                type="text"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Gender</label>
              <div className="form-input">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Date of Birth</label>
              <input
                min="1900-01-01"
                max="2010-12-31"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                rows={5}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Membership Status</label>
              <input
                type="text"
                name="membershipStatus"
                value={formData.membershipStatus}
                onChange={handleInputChange}
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
                name="social.twitter"
                value={formData.social.twitter}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Instagram</label>
              <input
                type="text"
                name="social.instagram"
                value={formData.social.instagram}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">Facebook</label>
              <input
                type="text"
                name="social.facebook"
                value={formData.social.facebook}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">LinkedIn</label>
              <input
                type="text"
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="form-label">GitHub</label>
              <input
                type="text"
                name="social.github"
                value={formData.social.github}
                onChange={handleInputChange}
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
