import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from 'react';

// Using free sound assets from Pixabay CDN for reliability
const SOUND_FILES = {
  click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2b21a32916.mp3',
  start: 'https://cdn.pixabay.com/audio/2022/08/02/audio_88c1b2620c.mp3',
  correct: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3b1322d2f.mp3',
  incorrect: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c337722949.mp3',
  attack: 'https://cdn.pixabay.com/audio/2022/04/07/audio_8233074427.mp3',
  hit: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8065b26392.mp3',
  win: 'https://cdn.pixabay.com/audio/2022/09/23/audio_0313572886.mp3',
  lose: 'https://cdn.pixabay.com/audio/2022/03/07/audio_a50a7b1263.mp3'
};

type SoundEffect = keyof typeof SOUND_FILES;

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (sound: SoundEffect) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioRefs = useRef<{ [key in SoundEffect]?: HTMLAudioElement }>({});

  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
  };
  
  // Preload sounds for better performance
  useEffect(() => {
    Object.entries(SOUND_FILES).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audioRefs.current[key as SoundEffect] = audio;
    });
  }, []);

  const playSound = useCallback((sound: SoundEffect) => {
    if (isSoundEnabled) {
      const audio = audioRefs.current[sound];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error(`Error playing sound: ${sound}`, error));
      }
    }
  }, [isSoundEnabled]);

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};