import React, { useEffect, useState, useRef } from 'react';
import useGameLogic from '../hooks/useGameLogic';
import { Difficulty } from '../types';
import HealthBar from './HealthBar';
import QuestionPanel from './QuestionPanel';
import Stickman from './Stickman';
import GameOverModal from './GameOverModal';
import ArrowIcon from './icons/ArrowIcon';

interface GameScreenProps {
  difficulty: Difficulty;
  stage: number;
  onGoHome: () => void;
  onBack: () => void;
  onGameEnd: (result: { won: boolean; score: number; correctAnswers: number; stage: number }) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ difficulty, stage, onGoHome, onBack, onGameEnd }) => {
  const {
    player,
    opponent,
    currentQuestion,
    handleAnswer,
    gameStatus,
    score,
    feedback,
    resetGame,
    isAnswering,
    correctAnswerCount,
  } = useGameLogic(difficulty, stage);

  const [showHitEffect, setShowHitEffect] = useState(false);
  const gameEndedReported = useRef(false);

  useEffect(() => {
    // When the component mounts for a new game, reset the flag.
    gameEndedReported.current = false;
  }, [difficulty, stage]);

  useEffect(() => {
    if ((gameStatus === 'won' || gameStatus === 'lost') && !gameEndedReported.current) {
      onGameEnd({
        won: gameStatus === 'won',
        score,
        correctAnswers: correctAnswerCount,
        stage,
      });
      gameEndedReported.current = true;
    }
  }, [gameStatus, onGameEnd, score, correctAnswerCount, stage]);


  useEffect(() => {
    if (player.state === 'hit') {
        setShowHitEffect(true);
        setTimeout(() => setShowHitEffect(false), 300);
    }
  }, [player.state]);

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2015/10/12/14/58/landscape-984155_1280.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      
      {/* Hit effect overlay */}
      <div className={`absolute inset-0 bg-red-600/50 z-20 transition-opacity duration-300 ${showHitEffect ? 'opacity-100' : 'opacity-0'} pointer-events-none`}></div>

      {gameStatus !== 'playing' && (
        <GameOverModal
          status={gameStatus}
          score={score}
          onPlayAgain={handlePlayAgain}
          onExit={onBack}
        />
      )}

      {/* Header */}
      <header className="w-full max-w-4xl mx-auto z-10 pt-10 sm:pt-4">
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white">You</h2>
            <div className="text-center">
                <div className="font-bangers text-4xl text-yellow-400">{score}</div>
                <div className="text-sm font-semibold text-gray-300">SCORE</div>
            </div>
            <h2 className="text-2xl font-bold text-white">AI Bot</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <HealthBar health={player.health} totalHealth={100} />
          <HealthBar health={opponent.health} totalHealth={100} reversed />
        </div>
      </header>

      {/* Battleground */}
      <main className="relative flex-grow w-full flex items-center justify-between max-w-5xl mx-auto px-8 z-10">
        <Stickman state={player.state} isPlayer={true} />
        {player.state === 'attacking' && <ArrowIcon className="absolute left-1/4 -translate-y-4 w-20 h-20 text-yellow-300 animate-fly-right" />}
        {opponent.state === 'attacking' && <ArrowIcon className="absolute right-1/4 -translate-y-4 w-20 h-20 text-red-400 animate-fly-left" style={{transform: 'scaleX(-1)'}} />}
        <Stickman state={opponent.state} isPlayer={false} />
      </main>

      {/* Footer - Question Panel */}
      <footer className="w-full max-w-4xl mx-auto z-10">
        {currentQuestion && (
          <QuestionPanel
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={isAnswering}
            feedback={feedback}
          />
        )}
      </footer>

       {/* Back Button */}
       <button 
        onClick={onBack} 
        className="absolute top-4 left-4 z-20 flex items-center gap-2 text-lg font-bold bg-black/30 p-2 rounded-lg hover:bg-black/50 transition-colors btn-interactive"
        aria-label="Back to Quest Map"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

    </div>
  );
};

export default GameScreen;