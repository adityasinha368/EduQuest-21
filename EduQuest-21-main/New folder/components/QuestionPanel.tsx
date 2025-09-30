import React from 'react';
import { Question } from '../types';
import CorrectAnswerEffect from './CorrectAnswerEffect';

interface QuestionPanelProps {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled: boolean;
  feedback: { correct: boolean; answer: string } | null;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question, onAnswer, disabled, feedback }) => {
  
  const getButtonClass = (option: string) => {
    if (!feedback) {
      return 'bg-gray-700/60 hover:bg-gray-600/80 btn-interactive';
    }
    if (option === feedback.answer) {
      return 'bg-green-600 animate-pulse'; // Correct answer
    }
    return 'bg-red-800/50 opacity-60'; // Incorrect options
  };

  return (
    <div className="relative bg-black/40 backdrop-blur-md border border-green-700/50 rounded-lg shadow-2xl p-4 sm:p-6 w-full">
      {feedback?.correct && <CorrectAnswerEffect />}
      <div className="mb-4">
        <p className="text-sm font-semibold text-green-300">QUESTION:</p>
        <h3 className="text-lg sm:text-xl font-bold text-white">{question.question}</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            disabled={disabled}
            className={`w-full text-left p-3 rounded-lg font-semibold transition-all duration-300 text-white ${
              disabled ? 'cursor-not-allowed' : ''
            } ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {feedback && (
         <div className="mt-4 p-3 rounded-lg bg-black/30">
            <p className="font-bold text-lg text-center">
                {feedback.correct ? "Correct!" : "Incorrect!"}
            </p>
            <p className="text-sm text-gray-300 mt-1 text-center">{question.fact}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;