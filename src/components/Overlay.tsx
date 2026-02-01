import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function Overlay(props: { selectedMemory?: any, onClose?: () => void }) {
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
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4">
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

            {/* Capture Controls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 right-8 flex flex-col gap-4 pointer-events-auto"
            >

                <button
                    onClick={() => {
                        const canvas = document.querySelector('canvas');
                        if (canvas) {
                            const stream = canvas.captureStream(30); // 30 FPS
                            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                            const chunks: BlobPart[] = [];

                            recorder.ondataavailable = (e) => {
                                if (e.data.size > 0) chunks.push(e.data);
                            };

                            recorder.onstop = () => {
                                const blob = new Blob(chunks, { type: 'video/webm' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = 'galaxy-loop-' + Date.now() + '.webm';
                                link.click();
                            };

                            recorder.start();
                            // Record for 5 seconds
                            setTimeout(() => {
                                recorder.stop();
                            }, 5000);
                        }
                    }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white/70 hover:text-white transition-all border border-white/10"
                    title="Record 5s Loop"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </button>
            </motion.div>
            {/* Message Modal */}
            <AnimatePresence>
                {/* @ts-ignore - prop passed from App */}
                {props.selectedMemory && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md pointer-events-auto p-4"
                        onClick={() => props.onClose?.()}
                    >
                        <div
                            className="bg-space-dark/90 border border-love-pink/30 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_50px_rgba(255,105,180,0.3)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* @ts-ignore */}
                            <img src={props.selectedMemory.image} alt="Memory" className="w-full h-64 object-cover rounded-lg mb-6 border border-white/10" />

                            <h3 className="text-2xl text-love-pink font-light tracking-widest mb-4">MEMORY</h3>
                            {/* @ts-ignore */}
                            <p className="text-white/90 text-lg leading-relaxed font-serif italic">"{props.selectedMemory.message}"</p>

                            <button
                                onClick={() => props.onClose?.()}
                                className="mt-8 px-6 py-2 border border-white/20 text-white/70 hover:bg-white/10 rounded-full text-xs tracking-[0.2em] transition-colors"
                            >
                                CLOSE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
