import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';
import { ChevronDown, ChevronUp, X, ZoomIn } from 'lucide-react';

// Lightbox Component
// Lightbox Component
const Lightbox: React.FC<{
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}> = ({ images, currentIndex, onClose, onNavigate }) => {

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => {
        // Close if clicking outside the image
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-50" onClick={onClose}>
        <X size={32} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
          >
            <ChevronDown className="rotate-90 w-12 h-12" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % images.length);
            }}
          >
            <ChevronDown className="-rotate-90 w-12 h-12" />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 text-white/50 font-mono text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        src={images[currentIndex]}
        alt={`View ${currentIndex + 1}`}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
      />
    </motion.div>
  );
};

interface PortfolioProps {
  items: PortfolioItem[];
}

const Portfolio: React.FC<PortfolioProps> = ({ items }) => {
  // Sort data by Year Descending, then Month Descending
  const sortedData = useMemo(() => {
    return [...items].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, [items]);

  // Group by Year
  const groupedData = useMemo(() => {
    const groups: { [key: number]: PortfolioItem[] } = {};
    sortedData.forEach(item => {
      if (!groups[item.year]) groups[item.year] = [];
      groups[item.year].push(item);
    });
    return groups;
  }, [sortedData]);

  // Filter to just years 2026-2020 for main view, allow expansion for others if needed
  const years = Object.keys(groupedData)
    .map(Number)
    .sort((a, b) => b - a);

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [lightboxState, setLightboxState] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightboxState({ images, index });
  };

  const navigateLightbox = (newIndex: number) => {
    if (lightboxState) {
      setLightboxState({ ...lightboxState, index: newIndex });
    }
  };

  const toggleProject = (id: string) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-24 bg-arc-black min-h-screen relative z-10">
      <AnimatePresence>
        {lightboxState && (
          <Lightbox
            images={lightboxState.images}
            currentIndex={lightboxState.index}
            onClose={() => setLightboxState(null)}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Selected Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A chronological archive of our global exhibition systems and designs.
          </p>
        </div>

        {years.length === 0 ? (
          <div className="text-center text-gray-600 py-20">No portfolio items found. Add some from the Admin menu.</div>
        ) : (
          <div className="space-y-32">
            {years.map((year) => (
              <div key={year} className="relative">
                {/* Year Marker */}
                <div className="sticky top-24 z-10 mb-8 md:mb-0 md:absolute md:-left-12 lg:-left-24">
                  <h3 className="text-6xl md:text-8xl font-black text-white/40 md:text-white/50 select-none md:-rotate-90 origin-center transform">
                    {year}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-16 md:pl-20">
                  {groupedData[year].map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      isExpanded={expandedProjectId === project.id}
                      onToggle={() => toggleProject(project.id)}
                      onImageClick={(images, index) => openLightbox(images, index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectRow: React.FC<{
  project: PortfolioItem;
  isExpanded: boolean;
  onToggle: () => void;
  onImageClick: (images: string[], index: number) => void;
}> = ({ project, isExpanded, onToggle, onImageClick }) => {
  const monthName = new Date(2000, project.month - 1).toLocaleString('en-US', { month: 'short' });

  return (
    <div className="group border-b border-white/5 pb-16 last:border-0">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

        {/* Date & Info */}
        <div className="lg:w-1/3 pt-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-arc-accent font-mono text-sm uppercase tracking-wider">
              {monthName}
            </span>
            <div className="h-px w-8 bg-white/20"></div>
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h4 className="text-3xl font-bold text-white mb-2">{project.title}</h4>
          <p className="text-lg text-gray-300 mb-4">{project.client}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase border border-white/10 text-gray-400 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">{project.location}</span>
          </div>
        </div>

        {/* Main Image (Trigger) */}
        <div className="lg:w-2/3 w-full">
          <div
            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group/image bg-gray-900"
            onClick={onToggle}
          >
            <img
              src={project.mainImageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
              onError={(e) => {
                // Fallback for broken images
                (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/1a1a1a/FFF?text=No+Image';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
              <motion.div
                className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover/image:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </motion.div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white">
              {isExpanded ? 'Hide Gallery' : 'View Gallery'}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Gallery */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 32 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {project.galleryImages && project.galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-square rounded-md overflow-hidden cursor-pointer relative group/thumb bg-gray-900"
                  onClick={() => onImageClick(project.galleryImages || [], idx)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a1a1a/FFF?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                    <ZoomIn className="text-white w-6 h-6" />
                  </div>
                </motion.div>
              ))}
              {(!project.galleryImages || project.galleryImages.length === 0) && (
                <div className="col-span-full text-center text-gray-500 text-sm py-4">No gallery images available.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;