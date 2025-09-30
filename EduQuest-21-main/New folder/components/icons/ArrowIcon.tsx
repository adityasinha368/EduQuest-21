import React from 'react';

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M21.92,11.6C21.78,11.46,21.6,11.38,21.41,11.38H11.59L13,10.06A1,1,0,0,0,11.59,8.59L8,12.18l3.59,3.59a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41L11.59,12.62H21.41A1,1,0,0,0,21.92,11.6Z"/>
        <path d="M5.12,2.21,8,4.46V2.3A1,1,0,0,0,6.22,1.43L2.61,4.19a1.18,1.18,0,0,0,0,2L6.22,9A1,1,0,0,0,8,8.13V6L5.12,3.75Z"/>
        <path d="M8,17.87V16l-2.88-2.21L8,19.7v-1.8a1,1,0,0,0-1.78-.87L2.61,19.59a1.18,1.18,0,0,0,0,2L6.22,24a1,1,0,0,0,1.78-.87Z"/>
    </svg>
);

export default ArrowIcon;
