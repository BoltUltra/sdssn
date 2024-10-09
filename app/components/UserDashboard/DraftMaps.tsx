import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import MapCard from "./MapCard";
import Button from "../Button";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/navigation";

const DraftMaps = () => {
  const router = useRouter();
  const goToUpload = () => {
    router.push("/dashboard/projects?tab=upload");
  };
  const [maps, setMaps] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setMaps(data.draftmaps))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!maps) return <Loading />;

  if (maps.length === 0) {
    return (
      <div className="text-center flex flex-col space-y-4 items-center mt-72">
        <h3 className="md:text-2xl text-xl">Upload your project</h3>
        <p className="max-w-sm mx-auto">
          Click the button below to upload your best work and be part of a
          growing community.
        </p>
        <Button
          text="Upload your project"
          icon={<MdAdd />}
          onClick={goToUpload}
        />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
      {maps.map((map) => (
        <MapCard map={map} />
      ))}
    </div>
  );
};

export default DraftMaps;
