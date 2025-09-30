import React, { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import QuestScreen from './components/QuestScreen';
import SearchingScreen from './components/SearchingScreen';
import LandingScreen from './components/LandingScreen';
import ProfileScreen from './components/ProfileScreen';
import { Difficulty, UserProgress } from './types';
import SoundToggle from './components/SoundToggle';
import { useSound } from './contexts/SoundContext';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'landing' | 'home' | 'quest' | 'searching' | 'playing' | 'profile'>('landing');
  const [difficulty, setDifficulty] = useState<Difficulty>('Normal');
  const [stage, setStage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playSound } = useSound();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedStages: [],
    totalScore: 0,
    correctAnswers: 0,
    gamesPlayed: 0,
  });

  const changeGameState = useCallback((newState: typeof gameState) => {
    setIsTransitioning(true);
    setTimeout(() => {
        setGameState(newState);
        setIsTransitioning(false);
    }, 300); // Match transition duration
  }, []);

  const handleLogin = useCallback(() => {
    playSound('click');
    changeGameState('home');
  }, [playSound, changeGameState]);

  const handleStartJourney = useCallback((selectedDifficulty: Difficulty) => {
    playSound('start');
    setDifficulty(selectedDifficulty);
    changeGameState('quest');
  }, [playSound, changeGameState]);

  const handleStartStage = useCallback((stageId: number) => {
    playSound('click');
    setStage(stageId);
    changeGameState('searching');
  }, [playSound, changeGameState]);

  const handleSearchComplete = useCallback(() => {
    changeGameState('playing');
  }, [changeGameState]);
  
  const handleGameEnd = useCallback(({ won, score, correctAnswers, stage: completedStage }: { won: boolean; score: number; correctAnswers: number; stage: number }) => {
    setUserProgress(prev => {
        const newCompletedStages = won && !prev.completedStages.includes(completedStage)
            ? [...prev.completedStages, completedStage]
            : prev.completedStages;

        return {
            completedStages: newCompletedStages,
            totalScore: prev.totalScore + score,
            correctAnswers: prev.correctAnswers + correctAnswers,
            gamesPlayed: prev.gamesPlayed + 1,
        };
    });
  }, []);

  const goHome = useCallback(() => {
    playSound('click');
    changeGameState('home');
  }, [playSound, changeGameState]);
  
  const goToQuest = useCallback(() => {
    playSound('click');
    changeGameState('quest');
  }, [playSound, changeGameState]);

  const showProfile = useCallback(() => {
    playSound('click');
    changeGameState('profile');
  }, [playSound, changeGameState]);

  return (
    <div className="text-white min-h-screen">
      <SoundToggle />
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {gameState === 'landing' && <LandingScreen onLogin={handleLogin} />}
        {gameState === 'home' && <HomeScreen onStartGame={handleStartJourney} />}
        {gameState === 'quest' && <QuestScreen onStartStage={handleStartStage} onGoHome={goHome} onShowProfile={showProfile} />}
        {gameState === 'searching' && <SearchingScreen onSearchComplete={handleSearchComplete} onBack={goToQuest} />}
        {gameState === 'playing' && <GameScreen difficulty={difficulty} stage={stage} onGoHome={goHome} onBack={goToQuest} onGameEnd={handleGameEnd} />}
        {gameState === 'profile' && <ProfileScreen userProgress={userProgress} onBack={goToQuest} />}
      </div>
    </div>
  );
};

export default App;