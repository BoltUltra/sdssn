import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import MapCard from "./MapCard";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import DiscussionCard from "./DiscussionCard";
import LinkCard from "./LinkCard";

const DraftLinks = () => {
  const router = useRouter();
  const goToUpload = () => {
    router.push("/dashboard/projects?tab=upload");
  };
  const [links, setLinks] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setLinks(data.draftlinks))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!links) return <Loading />;

  if (links.length === 0) {
    return (
      <div className="text-center flex flex-col space-y-4 items-center mt-72">
        <h3 className="md:text-2xl text-xl">Upload your project</h3>
        <p className="max-w-sm mx-auto">
          Click the button below to upload your best work and be part of a
          growing community.
        </p>
        <Button
          text="Upload link to a resource"
          icon={<MdAdd />}
          onClick={goToUpload}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {links.map((link) => (
        <LinkCard link={link} />
      ))}
    </div>
  );
};

export default DraftLinks;
