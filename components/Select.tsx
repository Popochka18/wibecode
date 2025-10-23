import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, children, id, ...props }) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-amber-100 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        className="block w-full pl-3 pr-10 py-2 text-base 
                   bg-slate-700 border border-amber-700/50 
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 
                   rounded-md text-amber-50"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};
