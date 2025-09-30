import React from 'react';

const EduQuestIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Owl */}
    <g transform="translate(130 40)">
      <path d="M-30 0 C-30 -20 30 -20 30 0 C 30 30 -30 30 -30 0" fill="#8B5CF6"/>
      <circle cx="-10" cy="-5" r="8" fill="white"/>
      <circle cx="10" cy="-5" r="8" fill="white"/>
      <circle cx="-10" cy="-5" r="3" fill="black"/>
      <circle cx="10" cy="-5" r="3" fill="black"/>
      <path d="M0 5 L5 10 L-5 10 Z" fill="#FBBF24"/>
      <path d="M-20 10 C -25 25, -10 25, -10 15" fill="#A78BFA"/>
      <path d="M20 10 C 25 25, 10 25, 10 15" fill="#A78BFA"/>
    </g>

    {/* Character 1 */}
    <g transform="translate(60 120)">
      <rect x="-15" y="0" width="30" height="40" rx="15" fill="#F87171"/>
      <circle cx="0" cy="-10" r="15" fill="#FECACA"/>
      <circle cx="-5" cy="-12" r="2" fill="black"/>
      <circle cx="5" cy="-12" r="2" fill="black"/>
      <path d="M-5 -5 Q 0 -2, 5 -5" stroke="black" fill="none" strokeWidth="1"/>
    </g>

    {/* Character 2 */}
    <g transform="translate(240 110)">
      <rect x="-15" y="0" width="30" height="40" rx="15" fill="#34D399"/>
      <circle cx="0" cy="-10" r="15" fill="#6EE7B7"/>
      <circle cx="-5" cy="-12" r="2" fill="black"/>
      <circle cx="5" cy="-12" r="2" fill="black"/>
      <path d="M-5 -5 Q 0 -2, 5 -5" stroke="black" fill="none" strokeWidth="1"/>
    </g>
    
    {/* Character 3 */}
     <g transform="translate(190 140)">
      <rect x="-15" y="0" width="30" height="40" rx="15" fill="#60A5FA"/>
      <circle cx="0" cy="-10" r="15" fill="#93C5FD"/>
      <circle cx="-5" cy="-12" r="2" fill="black"/>
      <circle cx="5" cy="-12" r="2" fill="black"/>
      <path d="M-5 -5 Q 0 -2, 5 -5" stroke="black" fill="none" strokeWidth="1"/>
    </g>

    {/* Character 4 */}
    <g transform="translate(100 150)">
      <rect x="-15" y="0" width="30" height="40" rx="15" fill="#FBBF24"/>
      <circle cx="0" cy="-10" r="15" fill="#FDE68A"/>
      <circle cx="-5" cy="-12" r="2" fill="black"/>
      <circle cx="5" cy="-12" r="2" fill="black"/>
      <path d="M-5 -5 Q 0 -2, 5 -5" stroke="black" fill="none" strokeWidth="1"/>
    </g>
    
    {/* Floating elements */}
    <g transform="translate(20 80)">
       <path d="M0 0 Q 5 -10, 10 0 T 20 0" fill="none" stroke="#34D399" strokeWidth="2"/>
       <circle cx="3" cy="-3" r="2" fill="#34D399" />
       <circle cx="17" cy="-3" r="2" fill="#34D399" />
    </g>

    <g transform="translate(260 60) rotate(20)">
      <path d="M0 -10 L 10 0 L 0 10 L -10 0 Z" fill="#FBBF24"/>
    </g>

    <g transform="translate(150 110)">
        <rect x="-30" y="0" width="60" height="40" rx="5" fill="#A78BFA"/>
        <circle cx="-15" cy="15" r="5" fill="#FBBF24"/>
        <circle cx="0" cy="20" r="5" fill="#FBBF24"/>
        <circle cx="15" cy="15" r="5" fill="#FBBF24"/>
    </g>
  </svg>
);

export default EduQuestIllustration;
