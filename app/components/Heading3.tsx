import React from "react";

const Heading3 = ({ text, style }) => {
  return (
    <h3 className={`md:text-[40px] text-2xl font-bold ${style}`}>{text}</h3>
  );
};

export default Heading3;
