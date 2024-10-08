import React from "react";

const Newsletter = () => {
  return (
    <div>
      <section className="bg-[#F9F9F9] py-20">
        <div className="section-container text-center">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col justify-center">
              <h3 className="md:text-[40px] text-2xl font-bold">
                Subscribe to our newsletter
              </h3>
              <p className="mt-5">To be updated with latest information</p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center md:mx-72 space-x-5">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
                <button className="bg-primary text-white rounded-lg px-10 py-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
