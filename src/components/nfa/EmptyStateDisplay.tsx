
import React from "react";

interface RegexIconProps {
  className: string;
}

// Icon for the empty state
const RegexIcon = ({ className }: RegexIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h-3v4h3v-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 8h9v4h-9v-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 16h-3v4h3v-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h9v4h-9v-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8v12" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h4" />
  </svg>
);

const EmptyStateDisplay = () => {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-50 border border-dashed border-gray-300 rounded-md">
      <div className="text-center text-gray-500">
        <div className="mb-2">
          <RegexIcon className="w-12 h-12 mx-auto text-gray-400" />
        </div>
        <p>Enter a regular expression to visualize its NFA</p>
      </div>
    </div>
  );
};

export default EmptyStateDisplay;
