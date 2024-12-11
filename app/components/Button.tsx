'use client';

import React from 'react';

interface ButtonProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, className, onClick }) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center space-x-3 bg-primary text-white py-4 px-10 md:w-fit w-full rounded-lg ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

export default Button;
