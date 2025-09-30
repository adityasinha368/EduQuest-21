import React from 'react';

const CorrectAnswerEffect: React.FC = () => {
    // Create an array of particles
    const particles = Array.from({ length: 15 });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((_, i) => {
                const style: React.CSSProperties = {
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    backgroundColor: ['#34D399', '#FBBF24', '#A78BFA', '#60A5FA'][Math.floor(Math.random() * 4)],
                };
                return (
                    <div
                        key={i}
                        className="absolute bottom-0 w-2 h-2 rounded-full animate-pop"
                        style={style}
                    ></div>
                );
            })}
        </div>
    );
};

export default CorrectAnswerEffect;
