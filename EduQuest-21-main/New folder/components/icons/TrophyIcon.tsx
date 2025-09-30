import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 2v20" />
    <path d="M4 12H2" />
    <path d="M22 12h-2" />
    <path d="M12 2L4.2 5.5" />
    <path d="M12 2l7.8 3.5" />
    <path d="M6 17l-4 4" />
    <path d="M18 17l4 4" />
  </svg>
);

export default TrophyIcon;