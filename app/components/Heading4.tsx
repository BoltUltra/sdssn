import React from "react";

const Heading4 = ({ text, className }) => {
  return <h4 className={`md:text-3xl text-2xl font-${className}`}>{text}</h4>;
};

export default Heading4;
