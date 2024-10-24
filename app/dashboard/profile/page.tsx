"use client";

import UserProfile from "@/app/components/UserDashboard/UserProfile";
import { useAuthStore } from "@/app/stores/authStore";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "Profile", value: "profile" },
  { name: "Certification", value: "certification" },
];

export default function Profile() {
  const auth = useAuthStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "profile";

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
    </main>
  );
}
