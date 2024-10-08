import React from "react";
import Heading3 from "../Heading3";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { partner_about } from "@/public/images";

const Partner = () => {
  const router = useRouter();
  return (
    <section className="bg-background">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="md:text-left text-center space-y-5">
            <Heading3
              text={
                "If you want to partner with us to promote the  society contact us."
              }
              style={"leading-normal"}
            />
            <button
              className="bg-primary text-white px-10 rounded-lg py-3"
              onClick={() => {
                router.push("/contact");
              }}
            >
              Contact Us
            </button>
          </div>
          <div className="md:block hidden">
            <Image
              src={partner_about}
              alt="partner image"
              className="mx-auto bg-primary p-5 rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
