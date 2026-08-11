import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { galleryData } from '../data/galleryData';
import { ArrowLeft, ChevronLeft, ChevronRight, X, AlertCircle } from 'lucide-react';

interface FolderGalleryProps {
  year: string;
  folderKey: string;
  onNavigate: (page: string) => void;
}

export const FolderGallery: React.FC<FolderGalleryProps> = ({ year, folderKey, onNavigate }) => {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const folder = galleryData[year]?.[folderKey];

  useEffect(() => {
    if (activePhotoIndex === null || !folder) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoIndex(null);
      else if (e.key === 'ArrowRight') setActivePhotoIndex(prev => prev !== null ? (prev + 1) % folder.images.length : null);
      else if (e.key === 'ArrowLeft') setActivePhotoIndex(prev => prev !== null ? (prev - 1 + folder.images.length) % folder.images.length : null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [activePhotoIndex, folder]);

  if (!folder) {
    return (
      <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-800 flex items-center justify-center p-6">
        <div className="text-center max-w-lg">
          <AlertCircle size={48} className="text-charcoal-300 mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-charcoal-700 dark:text-ivory-100 mb-4">Gallery Not Found</h2>
          <p className="text-charcoal-400 dark:text-charcoal-300 mb-8">The requested gallery folder does not exist or has been removed.</p>
          <button
            className="bg-gold-400 hover:bg-gold-500 text-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-all"
            onClick={() => onNavigate('gallery')}
          >
            {t('backToGalleryBtn')}
          </button>
        </div>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex(prev => prev !== null ? (prev - 1 + folder.images.length) % folder.images.length : null);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex(prev => prev !== null ? (prev + 1) % folder.images.length : null);
  };

  return (
    <div className="bg-ivory-50 dark:bg-charcoal-800 min-h-screen">

      {/* Header Banner */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${folder.imagePaths[0] || '/images/hero-bg1.jpg'})`, filter: 'brightness(0.35)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 pb-14 w-full">
          <button
            onClick={() => onNavigate('gallery')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t('backToGalleryBtn')}
          </button>

          <span className="glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-3 inline-block">
            {year} • {folder.imagePaths.length} photos
          </span>
          <h1 className="text-white max-w-3xl mb-2">{folder.displayName}</h1>
          {folder.description && (
            <p className="text-white/80 text-base max-w-2xl">{folder.description}</p>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {folder.images.length === 0 ? (
            <div className="text-center py-24 text-charcoal-300">
              <p className="text-base font-medium">{t('noImagesMsg')}</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {folder.imagePaths.map((imgPath, index) => (
                <div
                  key={index}
                  className="group relative break-inside-avoid overflow-hidden cursor-pointer"
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img
                    src={imgPath}
                    alt={`${folder.displayName} - ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/logo.png';
                      e.currentTarget.className = 'w-full h-auto object-contain p-8 bg-ivory-100';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-charcoal-900/98 flex flex-col items-center justify-center" onClick={() => setActivePhotoIndex(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors" onClick={() => setActivePhotoIndex(null)}>
            <X size={28} />
          </button>

          {folder.images.length > 1 && (
            <>
              <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-3 transition-colors" onClick={handlePrev}>
                <ChevronLeft size={32} />
              </button>
              <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-3 transition-colors" onClick={handleNext}>
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img
              className="max-w-full max-h-[80vh] object-contain"
              src={folder.imagePaths[activePhotoIndex]}
              alt={`${folder.displayName} - ${activePhotoIndex + 1}`}
              onError={(e) => { e.currentTarget.src = '/images/logo.png'; }}
            />
            <div className="mt-4 text-white/50 text-sm">
              {folder.displayName} <span className="text-white/30 ml-2">{activePhotoIndex + 1} / {folder.images.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
