import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-4 py-2 border border-transparent
        text-base font-medium rounded-md shadow-sm text-slate-900 bg-amber-400
        hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-offset-slate-900 focus:ring-amber-500
        disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
