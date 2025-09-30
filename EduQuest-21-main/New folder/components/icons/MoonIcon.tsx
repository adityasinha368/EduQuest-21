import React from 'react';

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-1.442.75.75 0 01.981.981A10.503 10.503 0 0118 21a10.5 10.5 0 01-10.5-10.5c0-4.368 2.667-8.112 6.46-9.64a.75.75 0 01.818.162z"
      clipRule="evenodd"
    />
  </svg>
);

export default MoonIcon;
