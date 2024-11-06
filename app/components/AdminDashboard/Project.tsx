"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import AllProjects from "./AllProjects";
import UsersProjects from "./UsersProjects";

const categories = [
  { name: "All Projects", value: "all-projects" },
  { name: "Users Project", value: "users-projects" },
];

export default function Project() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial tab from query params
  const currentTab = searchParams.get("tab") || "all-projects";

  // Map current tab to the tab index
  const currentTabIndex = categories.findIndex(
    (cat) => cat.value === currentTab
  );

  const handleTabChange = (index: number) => {
    const selectedTab = categories[index].value;
    router.push(`/admin/dashboard/projects?tab=${selectedTab}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex w-full justify-center px-4">
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
              <AllProjects />
            </TabPanel>
            <TabPanel>
              <UsersProjects />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
