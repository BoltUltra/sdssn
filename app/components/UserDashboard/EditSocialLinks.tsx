import React, { useState, useEffect } from "react";
import { useDataStore } from "@/app/stores/dataStore";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const EditSocialLinks = () => {
  const { editUserSocials, fetchUserProfile } = useDataStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    social: {
      twitter: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      github: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetchUserProfile();
        const userData = response.data;

        setFormData({
          social: {
            twitter: userData.social?.twitter || "",
            instagram: userData.social?.instagram || "",
            facebook: userData.social?.facebook || "",
            linkedin: userData.social?.linkedin || "",
            github: userData.social?.github || "",
          },
        });
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
    const socialField = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [socialField]: value,
      },
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUser = {
        social: formData.social,
      };

      await editUserSocials(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      toast.success("Social links updated successfully");
      router.push("/dashboard/profile");
    } catch (error) {
      toast.error("Failed to update social links");
      console.error("Error updating social links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
        <Button
          text={isLoading ? <div className="loader"></div> : "Save"}
          className={`${
            isLoading ? "bg-primary/50 mt-10" : "mt-10"
          } "mt-10 text-white"`}
          onClick={handleSave}
        ></Button>
      </div>
    </>
  );
};

export default EditSocialLinks;
