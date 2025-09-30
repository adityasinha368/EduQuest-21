import React, { useState, useEffect } from 'react';

interface SearchingScreenProps {
  onSearchComplete: () => void;
  onBack: () => void;
}

const SEARCH_MESSAGES = [
    "Searching for opponents...",
    "Sharpening arrows...",
    "Consulting the ancient trees...",
    "Calibrating eco-sensors...",
    "Ruffling through rulebooks...",
];

const SearchingScreen: React.FC<SearchingScreenProps> = ({ onSearchComplete, onBack }) => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % SEARCH_MESSAGES.length);
        }, 4000); // Change message every 4 seconds

        const searchTimeout = setTimeout(() => {
            onSearchComplete();
        }, 6000); // Simulate a 6-second search

        return () => {
            clearInterval(messageInterval);
            clearTimeout(searchTimeout);
        };
    }, [onSearchComplete]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-400 to-sky-600 overflow-hidden">
            {/* Animated Clouds */}
            <div className="absolute top-0 left-0 w-full h-full opacity-50">
                <div className="absolute top-1/4 -left-1/4 w-full h-1/2 bg-white rounded-full filter blur-3xl opacity-50 animate-move-clouds-1"></div>
                <div className="absolute top-1/2 -right-1/4 w-3/4 h-1/2 bg-white rounded-full filter blur-3xl opacity-40 animate-move-clouds-2"></div>
                <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full filter blur-2xl opacity-30 animate-move-clouds-1" style={{animationDuration: '60s'}}></div>
            </div>

            <main className="relative z-10 flex flex-col items-center text-center text-white">
                <div className="text-8xl animate-spin-slow mb-6">
                    🔍
                </div>
                <p className="text-2xl font-bold animate-fade-text">
                    {SEARCH_MESSAGES[messageIndex]}
                </p>
            </main>

            {/* Return Home Button */}
            <button
                onClick={onBack}
                className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-lg font-bold bg-black/30 p-2 px-4 rounded-lg hover:bg-black/50 transition-colors btn-interactive"
                aria-label="Return Home"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Return Home
            </button>
        </div>
    );
};

export default SearchingScreen;