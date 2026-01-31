import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Overlay() {
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('music.mp3'); // Placeholder ambient text
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) audioRef.current.pause();
        }
    }, []);

    const toggleSound = () => {
        if (audioRef.current) {
            if (muted) {
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
            setMuted(!muted);
        }
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8">
            {/* Intro Screen */}
            <AnimatePresence>
                {!started && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-space-dark/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto z-50"
                        onClick={() => {
                            setStarted(true);
                            toggleSound(); // Start audio on click
                        }}
                    >
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-love-pink to-soft-lavender font-light tracking-[0.2em] cursor-pointer hover:scale-105 transition-transform duration-700">
                                ENTER GALAXY
                            </h1>
                            <p className="text-white/50 mt-4 text-sm tracking-widest uppercase">Click to begin</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header / Info */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: started ? 1 : 0, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex justify-between items-start pointer-events-auto"
            >
                <div>
                    <h2 className="text-white/80 text-xl font-light tracking-wider">MY LOVE</h2>
                </div>

                <button
                    onClick={toggleSound}
                    className="text-white/60 hover:text-love-pink transition-colors uppercase text-xs tracking-widest"
                >
                    {muted ? "Sound Off" : "Sound On"}
                </button>
            </motion.div>

            {/* Footer Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{ delay: 2, duration: 2 }}
                className="text-center text-white/30 text-xs tracking-[0.3em]"
            >
                DRAG TO EXPLORE • CLICK MEMORIES
            </motion.div>
        </div>
    );
}
