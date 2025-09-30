import React from 'react';
import { UserProgress } from '../types';
import { BADGES } from '../constants';
import UserIcon from './icons/UserIcon';
import TrophyIcon from './icons/TrophyIcon';

interface ProfileScreenProps {
  userProgress: UserProgress;
  onBack: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="bg-black/30 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-green-400">{value}</p>
    </div>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userProgress, onBack }) => {
    const { completedStages, totalScore, correctAnswers, gamesPlayed } = userProgress;
    const winRate = gamesPlayed > 0 ? ((completedStages.length / gamesPlayed) * 100).toFixed(0) : 0;

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center p-4 bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url('https://images.hdqwalls.com/wallpapers/the-last-tree-of-yggdrasil-8k-fe.jpg')` }}
        >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <main className="relative z-10 w-full max-w-4xl mx-auto animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bangers tracking-wider text-purple-300">Player Profile</h1>
                    <div className="flex items-center gap-4">
                        <UserIcon className="w-12 h-12 p-2 bg-purple-500/50 rounded-full" />
                        <span className="text-2xl font-bold">Player</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Score" value={totalScore} />
                    <StatCard label="Stages Completed" value={`${completedStages.length} / ${BADGES.length}`} />
                    <StatCard label="Correct Answers" value={correctAnswers} />
                    <StatCard label="Win Rate" value={`${winRate}%`} />
                </div>

                {/* Badges */}
                <div>
                    <h2 className="text-3xl font-bangers tracking-wider text-purple-300 mb-4">Achievements</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {BADGES.map(badge => {
                            const isEarned = completedStages.includes(badge.id);
                            return (
                                <div 
                                    key={badge.id} 
                                    className={`p-4 rounded-lg text-center border-2 transition-all duration-300 ${
                                        isEarned 
                                        ? 'bg-yellow-500/20 border-yellow-400 shadow-lg shadow-yellow-500/20' 
                                        : 'bg-black/30 border-gray-600'
                                    }`}
                                    title={isEarned ? badge.description : 'Locked'}
                                >
                                    <TrophyIcon className={`w-16 h-16 mx-auto mb-2 ${isEarned ? 'text-yellow-400' : 'text-gray-500'}`} />
                                    <h3 className={`font-bold ${isEarned ? 'text-white' : 'text-gray-400'}`}>{badge.name}</h3>
                                    {!isEarned && <p className="text-xs text-gray-500">Locked</p>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            
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

export default ProfileScreen;
