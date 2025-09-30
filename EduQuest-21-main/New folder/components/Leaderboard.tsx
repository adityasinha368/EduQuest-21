import React from 'react';
import { LEADERBOARD_DATA } from '../constants';

const Leaderboard: React.FC = () => {
  return (
    <div className="w-full bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl p-4">
      <h3 className="font-bangers text-2xl text-yellow-300 tracking-wider text-center mb-3">Today's Top Runners</h3>
      <ul className="space-y-2">
        {LEADERBOARD_DATA.map((player) => (
          <li key={player.rank} className="flex justify-between items-center text-sm bg-black/20 p-2 rounded-md">
            <div className="flex items-center gap-3">
              <span className={`font-bold w-6 text-center ${
                player.rank === 1 ? 'text-yellow-400' : 
                player.rank === 2 ? 'text-gray-300' : 
                player.rank === 3 ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                #{player.rank}
              </span>
              <span className="text-gray-200">{player.name}</span>
            </div>
            <span className="font-semibold text-green-300">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;