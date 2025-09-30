import React from 'react';

const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2.69l.54 1.62A4.5 4.5 0 0 0 16.5 6h.38a2 2 0 0 1 1.99 2.22l-.5 3.56a2.5 2.5 0 0 1-2.4 2.22h-1.95a.5.5 0 0 0-.45.69l1.45 3.22a2 2 0 0 1-3.59 1.59l-.95-1.9a.5.5 0 0 0-.9 0l-.95 1.9a2 2 0 0 1-3.59-1.59l1.45-3.22a.5.5 0 0 0-.45-.69H4.32a2.5 2.5 0 0 1-2.4-2.22l-.5-3.56A2 2 0 0 1 3.41 6h.38a4.5 4.5 0 0 0 3.96-1.69L8.28 2.69A2 2 0 0 1 10 2h4a2 2 0 0 1 1.72.69z" />
  </svg>
);

export default FireIcon;
