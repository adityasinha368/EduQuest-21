import React from 'react';

interface HealthBarProps {
  health: number;
  totalHealth: number;
  reversed?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ health, totalHealth, reversed = false }) => {
  const percentage = (health / totalHealth) * 100;

  const healthColor = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-500' : 'bg-red-600';

  return (
    <div className={`relative w-full bg-gray-700/80 rounded-full h-6 border-2 border-gray-900/50 shadow-inner overflow-hidden ${reversed ? 'transform scale-x-[-1]' : ''}`}>
      <div
        className={`h-full rounded-full ${healthColor} transition-all duration-500 ease-in-out`}
        style={{ width: `${percentage}%` }}
      ></div>
       <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold text-white ${reversed ? 'transform scale-x-[-1]' : ''}`}>
        {health} / {totalHealth}
      </span>
    </div>
  );
};

export default HealthBar;
