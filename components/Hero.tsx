import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden z-10">
      
      {/* Subtle radial gradient to give depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Main Content */}
      <div className="container mx-auto px-6 z-10 text-center relative flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8 w-full flex justify-center"
        >
          {/* Logo Component */}
          <Logo className="w-full max-w-[280px] md:max-w-[400px] h-auto mix-blend-screen" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide mt-4">
            Systems & Content for Global Exhibitions
          </p>
        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">Scroll</span>
          <div className="w-[30px] h-[50px] border-2 border-gray-500 rounded-full flex justify-center p-2 opacity-70">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;