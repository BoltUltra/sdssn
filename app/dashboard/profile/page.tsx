"use client";

import UserProfile from "@/app/components/UserDashboard/UserProfile";
import { useAuthStore } from "@/app/stores/authStore";
import { useDataStore } from "@/app/stores/dataStore";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const categories = [
  { name: "Profile", value: "profile" },
  { name: "Certification", value: "certification" },
];

export default function Profile() {
  const auth = useAuthStore();
  const { editUserProfile } = useDataStore();

  const payload = {
    email: "boltultra@gmail.com",
    username: "BoltUltra",
    phoneNumber: "09012345679",
    fullName: "James Anderson",
    dateOfBirth: "2024-04-05",
    location: "Lagos",
    membership: "1",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedIn: "https://linkedin.com",
    github: "https://github.com",
    profileImage: "https://dummy",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editUserProfile(payload);
      alert("Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error editing profile:", error);
    }
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial tab from query params
  const currentTab = searchParams.get("tab") || "profile";

  // Map current tab to the tab index
  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/dashboard/profile?tab=${selectedTab}`, { scroll: false });
  };

  return (
    <main className="">
      <div>
        <div className="w-full">
          <TabGroup selectedIndex={currentTabIndex} onChange={handleTabChange}>
            <TabList className="flex md:gap-16 gap-10 border-b border-b-primary pb-6">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="pb-1 font-semibold text-primary border-b-2 border-b-transparent focus:outline-none data-[selected]:border-b-primary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-6">
              <TabPanel>
                <UserProfile />
              </TabPanel>
              <TabPanel>Boss</TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      {/* <button onClick={handleSubmit}>Edit Profile</button> */}
    </main>
  );
}
