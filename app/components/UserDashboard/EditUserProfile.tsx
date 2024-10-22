import { teammember } from "@/public/images";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { LuPencilLine } from "react-icons/lu";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/app/stores/dataStore";
import toast, { Toaster } from "react-hot-toast";

const EditUserProfile = () => {
  const router = useRouter();
  const { editUserProfile } = useDataStore();

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
  const [isLoading, setIsLoading] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState("");
  const [answer, setAnswer] = useState("");

  // useEffect to load data from localStorage on component mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

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
  }, []);

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

  return (
    <>
      <Toaster />
      <div className="md:px-20">
        <div className="relative h-20 w-20 rounded-full">
          <Image
            src={teammember}
            alt={"user image"}
            className="w-20 h-20 rounded-full"
          />
          <span className="absolute bottom-0 right-0 bg-white h-5 w-5 p-1 rounded-full flex items-center justify-center shadow-lg">
            <LuPencilLine />
          </span>
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
