"use client";

import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  onClick: () => void;
}

const ButtonSecondary: React.FC<ButtonProps> = ({
  icon,
  text,
  className,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-center space-x-3 border border-primary bg-white text-primary py-4 px-10 md:w-fit w-full rounded-lg ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default ButtonSecondary;
