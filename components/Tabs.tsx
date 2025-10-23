import React from 'react';

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return (
    <nav className="flex space-x-2 bg-slate-800/80 p-1 rounded-lg">
      {children}
    </nav>
  );
};

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 font-medium text-sm rounded-md flex items-center
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-500
        transition-colors duration-200
        ${
          isActive
            ? 'bg-amber-400 text-slate-900 shadow'
            : 'text-amber-100 hover:bg-slate-700/50'
        }
      `}
    >
      {children}
    </button>
  );
};
