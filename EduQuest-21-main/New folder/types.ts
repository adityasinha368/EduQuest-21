export type Difficulty = 'Easy' | 'Normal' | 'Hard';

export type GameMode = 'Single Player' | 'Two Player';

export type CharacterType = 'Archer' | 'Swordsman' | 'Mage';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  fact: string;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  score: number;
}

export interface UserProgress {
  completedStages: number[];
  totalScore: number;
  correctAnswers: number;
  gamesPlayed: number;
}
