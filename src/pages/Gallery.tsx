import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContextValue';
import { galleryData, getFlatGalleryFolders, getAllImages } from '../data/galleryData';
import type { FlatImage } from '../data/galleryData';
import { Image, X, ChevronLeft, ChevronRight, Grid3x3, FolderOpen, ZoomIn, ArrowRight } from 'lucide-react';
import type { RouteParams } from '../App';

interface GalleryProps {
  onNavigate: (page: string, params?: RouteParams) => void;
}

type ViewMode = 'folders' | 'all';

export const Gallery: React.FC<GalleryProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const folders = getFlatGalleryFolders();
  const allImages = getAllImages();

  const [viewMode, setViewMode] = useState<ViewMode>('folders');
  const [activeYear, setActiveYear] = useState<string>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lightboxImages, setLightboxImages] = useState<FlatImage[]>([]);

  const years = ['all', ...Array.from(new Set(folders.map(f => f.year))).sort((a, b) => b.localeCompare(a))];
  const filteredImages = activeYear === 'all' ? allImages : allImages.filter(img => img.year === activeYear);
  const filteredFolders = activeYear === 'all' ? folders : folders.filter(f => f.year === activeYear);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      else if (e.key === 'ArrowRight') setLightboxIdx(prev => prev !== null ? (prev + 1) % lightboxImages.length : null);
      else if (e.key === 'ArrowLeft') setLightboxIdx(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = prevOverflow; };
  }, [lightboxIdx, lightboxImages]);

  const openLightbox = (images: FlatImage[], startIdx: number) => {
    setLightboxImages(images);
    setLightboxIdx(startIdx);
  };

  const openFolderLightbox = (year: string, folderKey: string, imgIdx: number) => {
    const folder = galleryData[year]?.[folderKey];
    if (!folder) return;
    const imgs: FlatImage[] = folder.imagePaths.map((path, i) => ({
      src: path, alt: `${folder.displayName} - ${i + 1}`, year, folder: folderKey,
    }));
    openLightbox(imgs, imgIdx);
  };

  return (
    <div className="bg-ivory-50 dark:bg-charcoal-800 min-h-screen">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${folders[0]?.imagePaths[0] || '/images/hero-bg1.jpg'}")`, filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <span className="glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-3 inline-block">
            Portfolio & Memories
          </span>
          <h1 className="text-white max-w-3xl">{t('galleryPageTitle') || 'Gallery'}</h1>
          <p className="text-white/80 text-lg max-w-2xl mt-4 leading-relaxed">
            {t('galleryPageDesc') || 'Explore the wonderful moments captured in the life of Christ the King Church, Iruthyapuram.'}
          </p>
        </div>
      </section>

      {/* ═══════ TOOLBAR ═══════ */}
      <section className="sticky top-[72px] z-30 glass-nav py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* View toggle */}
          <div className="flex border border-charcoal-100 dark:border-charcoal-600 rounded-lg overflow-hidden">
            <button
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all ${viewMode === 'folders' ? 'bg-charcoal-700 text-white dark:bg-charcoal-600' : 'text-charcoal-400 hover:text-charcoal-700 dark:hover:text-ivory-100'}`}
              onClick={() => setViewMode('folders')}
            >
              <FolderOpen size={16} /> Folders
            </button>
            <button
              className={`flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all ${viewMode === 'all' ? 'bg-charcoal-700 text-white dark:bg-charcoal-600' : 'text-charcoal-400 hover:text-charcoal-700 dark:hover:text-ivory-100'}`}
              onClick={() => setViewMode('all')}
            >
              <Grid3x3 size={16} /> All Photos
            </button>
          </div>

          {/* Year pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {years.map(y => (
              <button
                key={y}
                className={`px-4 py-1.5 text-[13px] font-medium transition-all border ${activeYear === y ? 'bg-charcoal-700 border-charcoal-700 text-white dark:bg-gold-600 dark:border-gold-600' : 'border-charcoal-100 dark:border-charcoal-600 text-charcoal-400 hover:border-gold-400'}`}
                onClick={() => setActiveYear(y)}
              >
                {y === 'all' ? 'All Years' : y}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY CONTENT ═══════ */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {viewMode === 'folders' ? (
            filteredFolders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-charcoal-300">
                <FolderOpen size={48} className="mb-4 opacity-40" />
                <p className="text-base font-medium">{t('noGalleriesMsg')}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-20">
                {filteredFolders.map((folder) => (
                  <div key={`${folder.year}-${folder.folderKey}`}>
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-charcoal-50 dark:border-charcoal-700 pb-4">
                      <div>
                        <h2 className="text-2xl font-serif text-charcoal-700 dark:text-ivory-100 mb-1">{folder.displayName}</h2>
                        <p className="text-charcoal-500 dark:text-charcoal-200 text-sm flex items-center gap-3">
                          <span className="text-gold-500 font-semibold">{folder.year}</span>
                          <span>•</span>
                          <span>{folder.imagePaths.length} photos</span>
                          {folder.description && <><span>•</span><span>{folder.description}</span></>}
                        </p>
                      </div>
                      <button
                        className="self-start md:self-auto mt-4 md:mt-0 inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 text-[13px] font-semibold uppercase tracking-[0.15em] group"
                        onClick={() => onNavigate('gallery-folder', { year: folder.year, folderKey: folder.folderKey })}
                      >
                        {t('viewAlbumBtn')}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                      {folder.imagePaths.map((src, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="group relative break-inside-avoid overflow-hidden cursor-pointer"
                          onClick={() => openFolderLightbox(folder.year, folder.folderKey, imgIdx)}
                        >
                          <img src={src} alt={`${folder.displayName} ${imgIdx + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                              <ZoomIn size={22} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-charcoal-300">
                <Image size={48} className="mb-4 opacity-40" />
                <p className="text-base font-medium">{t('noImagesMsg')}</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative break-inside-avoid overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(filteredImages, idx)}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                      <span className="text-white text-sm font-medium">{img.folder} • {img.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxIdx !== null && lightboxImages.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-charcoal-900/98 flex flex-col items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button aria-label="Close image viewer" className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors" onClick={() => setLightboxIdx(null)}>
            <X size={28} />
          </button>

          {lightboxImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-3 transition-colors"
                onClick={e => { e.stopPropagation(); setLightboxIdx(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : null); }}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-3 transition-colors"
                onClick={e => { e.stopPropagation(); setLightboxIdx(prev => prev !== null ? (prev + 1) % lightboxImages.length : null); }}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img className="max-w-full max-h-[78vh] object-contain" src={lightboxImages[lightboxIdx].src} alt={lightboxImages[lightboxIdx].alt} />
            <div className="mt-4 text-white/60 text-sm text-center">
              {lightboxImages[lightboxIdx].alt}
              <span className="ml-3 text-white/30">{lightboxIdx + 1} / {lightboxImages.length}</span>
            </div>
          </div>

          {lightboxImages.length > 1 && (
            <div className="absolute bottom-6 max-w-full px-6 overflow-x-auto flex gap-2 no-scrollbar" onClick={e => e.stopPropagation()}>
              {lightboxImages.map((img, i) => (
                <button
                  key={i}
                  aria-label={`Show image ${i + 1}`}
                  className={`shrink-0 w-14 h-14 overflow-hidden border-2 transition-all ${i === lightboxIdx ? 'border-gold-400 opacity-100' : 'border-transparent opacity-40 hover:opacity-80'}`}
                  onClick={() => setLightboxIdx(i)}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
