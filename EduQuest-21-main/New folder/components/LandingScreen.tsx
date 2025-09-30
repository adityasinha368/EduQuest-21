import React from 'react';
import EduQuestIllustration from './icons/EduQuestIllustration';
import EduQuestLogoIcon from './icons/EduQuestLogoIcon';

interface LandingScreenProps {
  onLogin: () => void;
}

const LANGUAGES = [
    { code: 'en', name: 'ENGLISH', flag: '🇺🇸' },
    { code: 'es', name: 'SPANISH', flag: '🇪🇸' },
    { code: 'fr', name: 'FRENCH', flag: '🇫🇷' },
    { code: 'de', name: 'GERMAN', flag: '🇩🇪' },
    { code: 'it', name: 'ITALIAN', flag: '🇮🇹' },
    { code: 'pt', name: 'PORTUGUESE', flag: '🇵🇹' },
]

const LandingScreen: React.FC<LandingScreenProps> = ({ onLogin }) => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <EduQuestLogoIcon className="w-8 h-8" />
            <span className="text-2xl font-bold text-green-600">EduQuest</span>
          </div>
          <div className="relative">
             <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
                SITE LANGUAGE: ENGLISH
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
             </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Illustration */}
            <div className="text-center px-8 sm:px-0">
              <EduQuestIllustration className="w-full max-w-sm sm:max-w-md mx-auto" />
            </div>
            
            {/* Call to Action */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                The free, fun, and effective way to learn about our planet!
              </h1>
              <div className="flex flex-col items-center md:items-start gap-3 max-w-xs mx-auto md:mx-0">
                <button 
                  onClick={onLogin} 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl text-lg uppercase tracking-wider transition-colors shadow-lg border-b-4 border-green-700 active:border-b-2 btn-interactive"
                >
                  LOG IN NOW
                </button>
                <button className="w-full bg-white text-gray-500 hover:bg-gray-200 font-bold py-3 px-4 rounded-xl text-lg uppercase tracking-wider transition-colors border-2 border-gray-300 shadow-sm active:shadow-inner btn-interactive">
                  I ALREADY HAVE AN ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 hidden sm:block">
        <div className="container mx-auto px-6">
           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {LANGUAGES.map(lang => (
                    <a key={lang.code} href="#" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-600 transition-colors">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                    </a>
                ))}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;