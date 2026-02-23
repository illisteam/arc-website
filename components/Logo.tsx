import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const [imgError, setImgError] = useState(false);

  // 1. If 'logo.png' fails to load (file missing), render this SVG fallback
  // This ensures the site doesn't look broken while you are setting up files.
  if (imgError) {
    return (
      <svg 
        viewBox="0 0 400 300" 
        className={className} 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ARC Logo"
      >
        {/* Background: Black (will become transparent with mix-blend-screen) */}
        <rect width="400" height="300" fill="black" />
        
        {/* Main ARC Text */}
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="central" 
          textAnchor="middle" 
          fill="white" 
          fontSize="280" 
          fontWeight="900" 
          fontFamily="Impact, Anton, 'Arial Black', sans-serif"
          letterSpacing="-10"
          dy="10" 
        >
          ARC
        </text>

        {/* The "Cut" Bar - Black stripe masking the center */}
        <rect 
          x="0" 
          y="135" 
          width="400" 
          height="30" 
          fill="black" 
        />

        {/* Slogan Text inside the cut */}
        <text 
          x="50%" 
          y="156" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="white" 
          fontSize="13" 
          fontWeight="700" 
          fontFamily="Inter, sans-serif" 
          letterSpacing="3"
        >
          ALL / ROUNDER / COMPANY
        </text>
      </svg>
    );
  }

  // 2. Primary: Attempt to load the image file from root directory
  return (
    <img 
      src="logo.png" 
      alt="ARC - ALL / ROUNDER / COMPANY" 
      className={`${className} object-contain`}
      onError={() => setImgError(true)}
    />
  );
};

export default Logo;