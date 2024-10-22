import { teammember } from "@/public/images";
import Image from "next/image";
import React from "react";
import { LuPencilLine } from "react-icons/lu";
import Button from "../Button";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const goToEditProfile = () => {
    router.push("/dashboard/profile/edit-profile");
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  return (
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
            <p className="form-label">Full Name</p>
            <p id="fullName" className="">
              {currentUser?.fullName}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Username</p>
            <p id="fullName" className="">
              {currentUser?.username}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Email</p>
            <p id="fullName" className="">
              {currentUser?.email}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Date of Birth</p>
            <p id="fullName" className="">
              {`${currentUser?.dateOfBirth}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Location</p>
            <p id="fullName" className="">
              {`${currentUser?.location}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Membership Status</p>
            <p id="fullName" className="">
              {`${currentUser?.membership}` || "Null"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Social Links</p>
        <div className="md:grid grid-cols-2 gap-8 mt-5">
          <div className="flex flex-col space-y-2">
            <p className="form-label">Twitter</p>
            <p id="fullName" className="">
              {`${currentUser?.twitter}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Instagram</p>
            <p id="fullName" className="">
              {`${currentUser?.instagram}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">Facebook</p>
            <p id="fullName" className="">
              {`${currentUser?.facebook}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">LinkedIn</p>
            <p id="fullName" className="">
              {`${currentUser?.linkedIn}` || "Null"}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="form-label">GitHub</p>
            <p id="fullName" className="">
              {`${currentUser?.github}` || "Null"}
            </p>
          </div>
        </div>
      </div>
      <Button
        text="Edit Profile"
        className="mt-10 text-white"
        onClick={goToEditProfile}
      ></Button>
    </div>
  );
};

export default UserProfile;
