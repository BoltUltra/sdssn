"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import toast from "react-hot-toast";
import Button from "../Button";

const AccountSettings = () => {
  const router = useRouter();
  const { resetPassword } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await resetPassword({ currentPassword, newPassword });
    } catch (error) {
      toast.error("An error occurred while resetting the password");
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      // await deleteUserProfile();
      toast.success("Profile deleted successfully");
      router.push("/login");
    } catch (error) {
      toast.error("An error occurred while deleting the profile");
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="md:px-20">
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Reset Password</p>
        <form
          onSubmit={handlePasswordReset}
          className="flex flex-col space-y-4 mt-5"
        >
          <div className="flex flex-col space-y-2">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <Button
            text={isLoading ? <div className="loader"></div> : "Reset Password"}
            className={`${
              isLoading ? "bg-primary/50 mt-10" : ""
            } "mt-10 text-white"`}
          ></Button>
        </form>
      </div>
      <div className="mt-10">
        <p className="text-2xl font-semibold mt-4">Delete Profile</p>
        <Button
          text="Delete Profile"
          className="mt-5 text-white bg-red-600"
          onClick={handleDeleteProfile}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
