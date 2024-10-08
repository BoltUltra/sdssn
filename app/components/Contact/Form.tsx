import React from "react";
import Heading3 from "../Heading3";

const Form = () => {
  return (
    <section className="pt-44 pb-20 bg-background">
      <div className="max-w-[1440px] mx-auto md:px-20 px-5">
        <div className="grid md:grid-cols-2 gap-10 ">
          <div className="space-y-6">
            <Heading3
              text={"Contact Us"}
              className={"font-semibold uppercase"}
            />
            <p className="md:pr-32">
              If you want to partner with us to promote the society contact us.
            </p>
            <p>We Will Be Happy To Have You</p>
          </div>
          <div>
            <form action="" className="space-y-8">
              <div className="flex flex-col space-y-2">
                <label htmlFor="fullName" className="contact-form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="contact-form-input"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="phone" className="contact-form-label">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="contact-form-input"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="contact-form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="contact-form-input"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="contact-form-label">
                  Message
                </label>
                <textarea
                  name=""
                  id=""
                  cols={5}
                  rows={5}
                  className="contact-form-input"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
