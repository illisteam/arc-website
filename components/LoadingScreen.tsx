import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Animated Background Ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 border border-white/20 rounded-full"
                />

                {/* Second Background Ring */}
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 border border-white/10 rounded-full scale-125"
                />

                {/* Central Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
                    }}
                    className="relative z-10 w-32 h-32"
                >
                    <img
                        src="/logo_v2.png"
                        alt="ARC Logo"
                        className="w-full h-full object-contain filter invert brightness-200"
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-12 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-light">
                        All Rounder Company
                    </span>
                    <div className="w-24 h-[1px] bg-white/10 overflow-hidden">
                        <motion.div
                            animate={{
                                x: [-100, 100],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-full h-full bg-white/30"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
