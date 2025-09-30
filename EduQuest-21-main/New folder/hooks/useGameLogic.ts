import { useState, useEffect, useCallback, useMemo } from 'react';
import { Difficulty, Question } from '../types';
import { QUESTIONS } from '../constants';
import { useSound } from '../contexts/SoundContext';

type StickmanState = 'idle' | 'attacking' | 'hit' | 'dead';
type GameStatus = 'playing' | 'won' | 'lost';

interface Fighter {
  health: number;
  state: StickmanState;
}

const initialState = {
  player: { health: 100, state: 'idle' as StickmanState },
  opponent: { health: 100, state: 'idle' as StickmanState },
  gameStatus: 'playing' as GameStatus,
  score: 0,
  isAnswering: false,
  correctAnswerCount: 0,
};

const useGameLogic = (difficulty: Difficulty, stage: number) => {
  const [player, setPlayer] = useState<Fighter>(initialState.player);
  const [opponent, setOpponent] = useState<Fighter>(initialState.opponent);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(initialState.gameStatus);
  const [score, setScore] = useState(initialState.score);
  const [feedback, setFeedback] = useState<{ correct: boolean; answer: string } | null>(null);
  const [isAnswering, setIsAnswering] = useState(initialState.isAnswering);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(initialState.correctAnswerCount);
  const { playSound } = useSound();

  const difficultySettings = useMemo(() => ({
    Easy: { damage: 25, aiAccuracy: 0.6 },
    Normal: { damage: 20, aiAccuracy: 0.75 },
    Hard: { damage: 15, aiAccuracy: 0.9 },
  }), []);

  const loadQuestions = useCallback(() => {
    const stageQuestions = QUESTIONS[difficulty][stage] || QUESTIONS[difficulty][1];
    setQuestions(stageQuestions.sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
  }, [difficulty, stage]);

  useEffect(() => {
    loadQuestions();
  }, [difficulty, stage, loadQuestions]);

  const resetGame = useCallback(() => {
    setPlayer(initialState.player);
    setOpponent(initialState.opponent);
    setGameStatus(initialState.gameStatus);
    setScore(initialState.score);
    loadQuestions();
    setFeedback(null);
    setIsAnswering(false);
    setCorrectAnswerCount(initialState.correctAnswerCount);
  }, [loadQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  const changeFighterState = (
    fighter: 'player' | 'opponent',
    state: StickmanState,
    duration: number,
    callback?: () => void
  ) => {
    const setFighter = fighter === 'player' ? setPlayer : setOpponent;
    setFighter(prev => ({ ...prev, state }));
    setTimeout(() => {
      setFighter(prev => ({ ...prev, state: 'idle' }));
      if (callback) callback();
    }, duration);
  };

  const handleAnswer = useCallback((answer: string) => {
    if (isAnswering || !currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setIsAnswering(true);
    setFeedback({ correct: isCorrect, answer: currentQuestion.correctAnswer });
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      if (isCorrect) {
        setCorrectAnswerCount(c => c + 1);
        // Player attacks
        changeFighterState('player', 'attacking', 800, () => {
          playSound('attack');
          const newOpponentHealth = Math.max(0, opponent.health - difficultySettings[difficulty].damage);
          setOpponent({ health: newOpponentHealth, state: 'hit' });
          setTimeout(() => playSound('hit'), 200);
          setScore(s => s + 100);
          setTimeout(() => setOpponent(o => ({ ...o, state: newOpponentHealth <= 0 ? 'dead' : 'idle' })), 500);
        });
      }

      // Opponent's turn after a delay
      setTimeout(() => {
        if(opponent.health <= 0 || player.health <= 0) return;

        const aiCorrect = Math.random() < difficultySettings[difficulty].aiAccuracy;
        if (aiCorrect) {
          changeFighterState('opponent', 'attacking', 800, () => {
            playSound('attack');
            const newPlayerHealth = Math.max(0, player.health - difficultySettings[difficulty].damage);
            setPlayer({ health: newPlayerHealth, state: 'hit' });
            setTimeout(() => playSound('hit'), 200);
            setTimeout(() => setPlayer(p => ({ ...p, state: newPlayerHealth <= 0 ? 'dead' : 'idle' })), 500);
          });
        }
        
        // Move to next question after AI turn
        setTimeout(() => {
            setFeedback(null);
            setIsAnswering(false);
            setCurrentQuestionIndex(i => (i + 1) % questions.length);
        }, 1500);

      }, 1500);
    }, 2000); // Feedback display duration

  }, [currentQuestion, isAnswering, opponent.health, player.health, questions.length, difficulty, difficultySettings, playSound]);


  useEffect(() => {
    if (gameStatus !== 'playing') return;
    if (opponent.health <= 0) {
      setGameStatus('won');
      playSound('win');
    } else if (player.health <= 0) {
      setGameStatus('lost');
      playSound('lose');
    }
  }, [player.health, opponent.health, playSound, gameStatus]);

  return {
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
  };
};

export default useGameLogic;