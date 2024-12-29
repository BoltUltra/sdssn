import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'icon';
}

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const variantClasses =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
      : 'text-white bg-blue-600 hover:bg-blue-700';
  const sizeClasses = size === 'icon' ? 'p-2' : 'px-4 py-2';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
