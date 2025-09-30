import React from 'react';

type StickmanState = 'idle' | 'attacking' | 'hit' | 'dead';

interface StickmanProps {
  state: StickmanState;
  isPlayer?: boolean;
}

// Simple stickman SVG components for different states
const IdleStickman = () => (
  <g>
    <circle cx="50" cy="20" r="10" fill="white" />
    <line x1="50" y1="30" x2="50" y2="60" stroke="white" strokeWidth="4" />
    <line x1="50" y1="40" x2="30" y2="50" stroke="white" strokeWidth="4" />
    <line x1="50" y1="40" x2="70" y2="50" stroke="white" strokeWidth="4" />
    <line x1="50" y1="60" x2="35" y2="85" stroke="white" strokeWidth="4" />
    <line x1="50" y1="60" x2="65" y2="85" stroke="white" strokeWidth="4" />
  </g>
);

const AttackingStickman = () => (
    <g>
      {/* Bow */}
      <path d="M 70 10 C 50 50, 50 50, 70 90" stroke="brown" strokeWidth="4" fill="none" />
      <line x1="70" y1="10" x2="70" y2="90" stroke="gray" strokeWidth="2" />
      {/* Stickman */}
      <circle cx="50" cy="20" r="10" fill="white" />
      <line x1="50" y1="30" x2="50" y2="60" stroke="white" strokeWidth="4" />
      <line x1="50" y1="40" x2="70" y2="30" stroke="white" strokeWidth="4" />
      <line x1="50" y1="40" x2="70" y2="70" stroke="white" strokeWidth="4" />
      <line x1="50" y1="60" x2="35" y2="85" stroke="white" strokeWidth="4" />
      <line x1="50" y1="60" x2="65" y2="85" stroke="white" strokeWidth="4" />
    </g>
);

const HitStickman = () => (
  <g className="animate-shake">
    <circle cx="50" cy="25" r="10" fill="red" />
    <line x1="50" y1="35" x2="45" y2="60" stroke="white" strokeWidth="4" />
    <line x1="50" y1="45" x2="30" y2="50" stroke="white" strokeWidth="4" />
    <line x1="50" y1="45" x2="65" y2="40" stroke="white" strokeWidth="4" />
    <line x1="45" y1="60" x2="35" y2="85" stroke="white" strokeWidth="4" />
    <line x1="45" y1="60" x2="60" y2="80" stroke="white" strokeWidth="4" />
  </g>
);

const DeadStickman = () => (
  <g transform="translate(0, 15) rotate(-90 50 50)">
    <circle cx="50" cy="20" r="10" fill="gray" />
    <line x1="50" y1="30" x2="50" y2="60" stroke="gray" strokeWidth="4" />
    <line x1="50" y1="40" x2="30" y2="50" stroke="gray" strokeWidth="4" />
    <line x1="50" y1="40" x2="70" y2="50" stroke="gray" strokeWidth="4" />
    <line x1="50" y1="60" x2="35" y2="85" stroke="gray" strokeWidth="4" />
    <line x1="50" y1="60" x2="65" y2="85" stroke="gray" strokeWidth="4" />
  </g>
);


const Stickman: React.FC<StickmanProps> = ({ state, isPlayer = true }) => {
  const renderState = () => {
    switch (state) {
      case 'attacking':
        return <AttackingStickman />;
      case 'hit':
        return <HitStickman />;
      case 'dead':
        return <DeadStickman />;
      case 'idle':
      default:
        return <IdleStickman />;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48" style={{ transform: isPlayer ? '' : 'scaleX(-1)' }}>
      {renderState()}
    </svg>
  );
};

export default Stickman;
