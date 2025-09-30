import React, { useState } from 'react';
import { Difficulty } from '../types';
import Leaderboard from './Leaderboard';
import FireIcon from './icons/FireIcon';
import { useSound } from '../contexts/SoundContext';

interface HomeScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal');
  const { playSound } = useSound();

  const difficulties: Difficulty[] = ['Easy', 'Normal', 'Hard'];

  const handleDifficultyClick = (d: Difficulty) => {
    playSound('click');
    setDifficulty(d);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-cyan-400 to-green-500 overflow-hidden"
    >
        {/* Floating Shapes */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-start items-center z-10">
        <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-sm font-semibold">
          <FireIcon className="w-5 h-5 text-orange-400" />
          <span>Streak: 1 Day</span>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="font-bangers text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-[0_4px_2px_rgba(0,0,0,0.4)] tracking-wider">
          EduQuest
        </h1>
        <p className="max-w-xl mt-2 text-base sm:text-lg font-medium text-gray-100">
          Test your environmental knowledge in an epic battle of wits! Answer questions to launch attacks and be the last one standing.
        </p>

        <div className="mt-8 sm:mt-12 w-full max-w-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Choose your Challenge</h2>
            <div className="grid grid-cols-3 gap-3">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => handleDifficultyClick(d)}
                  className={`py-3 px-2 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 shadow-md btn-interactive ${
                    difficulty === d
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white ring-2 ring-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onStartGame(difficulty)}
          className="mt-8 px-12 py-4 text-2xl font-bangers tracking-widest bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white shadow-[0_5px_20px_rgba(45,212,191,0.4)] hover:shadow-[0_8px_30px_rgba(45,212,191,0.6)] transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0 active:scale-100 btn-interactive"
        >
          START FIND GAME
        </button>
        
        <div className="mt-12 w-full max-w-sm">
            <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;