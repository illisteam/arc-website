import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Logo className="h-10 w-auto mix-blend-screen opacity-80" />
          <span>© {new Date().getFullYear()} arc Systems Inc. All rights reserved.</span>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;