import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';
import PlayIcon from './icons/PlayIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import { useSound } from '../contexts/SoundContext';

interface QuestScreenProps {
  onStartStage: (stageId: number) => void;
  onGoHome: () => void;
  onShowProfile: () => void;
}

const STAGES = [
  { id: 1, name: 'Stage 1', locked: false, position: { top: '70%', left: '25%' } },
  { id: 2, name: 'Stage 2', locked: false, position: { top: '55%', left: '40%' } },
  { id: 3, name: 'Stage 3', locked: false, position: { top: '70%', left: '50%' } },
  { id: 4, name: 'Stage 4', locked: false, position: { top: '80%', left: '75%' } },
  { id: 5, name: 'Stage 5', locked: false, position: { top: '68%', left: '85%' } },
  { id: 6, name: 'Stage 6', locked: false, position: { top: '48%', left: '88%' } },
  { id: 7, name: 'Stage 7', locked: false, position: { top: '35%', left: '82%' } },
  { id: 8, name: 'Stage 8', locked: false, position: { top: '25%', left: '70%' } },
];


const QuestScreen: React.FC<QuestScreenProps> = ({ onStartStage, onGoHome, onShowProfile }) => {
    const [isNightMode, setIsNightMode] = useState(true);
    const { playSound } = useSound();

    const handleStageClick = (stageId: number) => {
        onStartStage(stageId);
    }

    return (
    <div
      className="relative min-h-screen w-full flex bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url('https://images.hdqwalls.com/wallpapers/the-last-tree-of-yggdrasil-8k-fe.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-black/20 backdrop-blur-lg p-4 flex flex-col">
        <button onClick={onGoHome} className="flex items-center gap-2 text-lg font-bold bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors btn-interactive">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
        </button>
        <div className="flex items-center gap-3 p-3 my-6 bg-purple-600/50 rounded-lg">
            <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center font-bold text-purple-800 text-xl">E</div>
            <h1 className="text-2xl font-bold">EduQuest</h1>
        </div>
        <div className="flex items-center justify-between gap-3 p-2 mb-8 bg-white/10 rounded-lg">
            <div className="flex items-center gap-3">
                <UserIcon className="w-8 h-8 p-1.5 bg-purple-500/50 rounded-full" />
                <span className="font-semibold">Player</span>
            </div>
            <button onClick={onShowProfile} className="text-sm font-bold bg-purple-600/80 hover:bg-purple-500/80 px-3 py-1 rounded-md transition-colors btn-interactive">
                Profile
            </button>
        </div>

        <nav className="flex-grow space-y-2">
            {STAGES.map(stage => (
                <button 
                    key={stage.id} 
                    onClick={() => !stage.locked && handleStageClick(stage.id)}
                    disabled={stage.locked}
                    className={`w-full text-left p-3 rounded-lg font-semibold transition-colors btn-interactive ${
                        !stage.locked
                         ? 'bg-purple-600 hover:bg-purple-500'
                         : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {stage.name}
                </button>
            ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 mb-4 text-center">
            <h2 className="text-4xl font-bold text-purple-300">Welcome to EduQuest!</h2>
        </div>
        <p className="text-2xl font-semibold mb-6">Quest Map</p>
        
        <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
            <img src="https://cdn.pixabay.com/photo/2024/02/23/15/27/ai-generated-8592296_1280.jpg" alt="Quest Map" className="w-full h-full object-cover"/>
            
            {STAGES.map(stage => (
                <button
                    key={stage.id}
                    onClick={() => !stage.locked && handleStageClick(stage.id)}
                    disabled={stage.locked}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg transition-transform hover:scale-110 btn-interactive"
                    style={{ top: stage.position.top, left: stage.position.left, backgroundColor: stage.locked ? '#4a5568' : '#8B5CF6' }}
                    aria-label={stage.name}
                >
                    {stage.locked ? <LockIcon className="w-6 h-6"/> : <PlayIcon className="w-8 h-8"/>}
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{stage.id}</span>
                </button>
            ))}
        </div>
      </main>

      {/* Top Right Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer btn-interactive" style={{backgroundColor: isNightMode ? '#4A5568' : '#F7B619'}} onClick={() => { playSound('click'); setIsNightMode(!isNightMode); }}>
            <div className={`absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isNightMode ? 'translate-x-8' : 'translate-x-0'}`}></div>
            <div className="w-full flex justify-between">
                <SunIcon className="w-5 h-5 text-yellow-900" />
                <MoonIcon className="w-5 h-5 text-white" />
            </div>
        </div>
      </div>

    </div>
  );
};

export default QuestScreen;