import React from 'react';
import { useSound } from '../contexts/SoundContext';

interface GameOverModalProps {
  status: 'won' | 'lost';
  score: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ status, score, onPlayAgain, onExit }) => {
  const isWinner = status === 'won';
  const title = isWinner ? 'Victory!' : 'Game Over';
  const message = isWinner
    ? "You've successfully defended the environment! Well done."
    : 'The environment has been overwhelmed. Better luck next time!';
  const { playSound } = useSound();

  const handlePlayAgainClick = () => {
    playSound('start');
    onPlayAgain();
  };

  const handleExitClick = () => {
    playSound('click');
    onExit();
  };


  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-green-500 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full animate-fade-in-up">
        <h2 className={`font-bangers text-6xl tracking-wider mb-2 ${isWinner ? 'text-yellow-400' : 'text-red-500'}`}>
          {title}
        </h2>
        <p className="text-gray-300 mb-6">{message}</p>
        
        <div className="bg-black/30 p-4 rounded-lg mb-8">
            <p className="text-lg text-gray-400">Your Final Score:</p>
            <p className="font-bangers text-5xl text-green-400">{score}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePlayAgainClick}
            className="px-8 py-3 text-xl font-bangers tracking-widest bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white shadow-[0_5px_20px_rgba(45,212,191,0.4)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 btn-interactive"
          >
            Play Again
          </button>
          <button
            onClick={handleExitClick}
            className="px-8 py-3 text-xl font-bangers tracking-widest bg-gray-600 hover:bg-gray-500 rounded-lg text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 btn-interactive"
          >
            Exit to Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;