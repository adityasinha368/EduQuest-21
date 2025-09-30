import React from 'react';
import { useSound } from '../contexts/SoundContext';
import SoundOnIcon from './icons/SoundOnIcon';
import SoundOffIcon from './icons/SoundOffIcon';

const SoundToggle: React.FC = () => {
    const { isSoundEnabled, toggleSound, playSound } = useSound();

    const handleToggle = () => {
        // We play the click sound before toggling the state
        // so the user hears feedback for turning it off.
        if (isSoundEnabled) {
          playSound('click');
        }
        // If sound is currently off, we can't play a sound yet,
        // so we just enable it. The user will hear the next sound they trigger.
        toggleSound();
    };

    return (
        <button
            onClick={handleToggle}
            className="fixed top-4 right-4 z-50 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors btn-interactive"
            aria-label={isSoundEnabled ? 'Disable Sound' : 'Enable Sound'}
        >
            {isSoundEnabled ? <SoundOnIcon className="w-6 h-6" /> : <SoundOffIcon className="w-6 h-6" />}
        </button>
    );
};

export default SoundToggle;
