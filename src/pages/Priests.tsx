import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import priestsData from '../data/priests.json';
import { CalendarDays, Church, Crown, Star, Users } from 'lucide-react';

export const Priests: React.FC = () => {
  const { t, language } = useLanguage();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number(e.target.getAttribute('data-idx'));
          if (!isNaN(idx)) setVisibleCards(prev => new Set(prev).add(idx));
        }
      }),
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    document.querySelectorAll('[data-idx]').forEach(el => observer.observe(el));

    const fallbackTimer = setTimeout(() => {
      const allIndices = pastPriests.map((_, i) => i);
      setVisibleCards(new Set(allIndices));
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const currentPriest = priestsData[priestsData.length - 1];
  const pastPriests = priestsData.slice(0, -1);
  const currentName = language === 'ta' ? (currentPriest.nameTa || currentPriest.name) : currentPriest.name;
  const currentDesc = language === 'ta' ? (currentPriest.descriptionTa || currentPriest.description) : currentPriest.description;

  return (
    <div className="bg-ivory-50 dark:bg-charcoal-800 min-h-screen">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/images/hero-bg3.jpg)`, filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <span className="glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-3 inline-block">
            Our Shepherds
          </span>
          <h1 className="text-white max-w-3xl">{t('priestsLink') || 'Parish Priests'}</h1>
          <p className="text-white/80 text-lg max-w-2xl mt-4 leading-relaxed">
            {t('priestsHeroDesc') || 'Honoring the dedicated priests who have faithfully served and guided our parish community over the years.'}
          </p>
        </div>
      </section>

      {/* ═══════ CURRENT PRIEST — Full-width split ═══════ */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-700 text-gold-600 dark:text-gold-400 text-[12px] font-semibold tracking-[0.1em] uppercase">
              <Crown size={14} />
              {language === 'ta' ? 'தற்போதைய பங்குத்தந்தை' : 'Current Parish Priest'}
            </div>
          </div>

          <div className="glass-card grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto p-8 md:p-12 rounded-3xl">
            {/* Portrait */}
            <div className="relative overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl">
              <img
                src={currentPriest.photoPath}
                alt={currentName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentPriest.name) + '&background=C8A96E&color=fff&size=512';
                }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <h2 className="text-charcoal-700 dark:text-ivory-100">{currentName}</h2>
              <div className="w-12 h-[1px] bg-gold-400" />

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-[13px] text-charcoal-400 dark:text-charcoal-300 font-medium">
                  <CalendarDays size={15} className="text-gold-500" /> {currentPriest.years}
                </span>
                {currentPriest.dateofordination && (
                  <span className="inline-flex items-center gap-2 text-[13px] text-charcoal-400 dark:text-charcoal-300 font-medium">
                    <Star size={15} className="text-gold-500" />
                    {language === 'ta' ? 'திருநிலைப்படுத்தல்: ' : 'Ordained: '}{currentPriest.dateofordination}
                  </span>
                )}
              </div>

              <p className="text-charcoal-400 dark:text-charcoal-200 text-lg leading-[1.9]">{currentDesc}</p>

              <div className="flex flex-wrap gap-8 pt-6 border-t border-charcoal-50 dark:border-charcoal-700 mt-2">
                <div className="flex items-center gap-3">
                  <Church size={20} className="text-gold-500" />
                  <span className="text-charcoal-600 dark:text-charcoal-200 text-sm font-medium">{language === 'ta' ? 'இருதயபுரம் பங்கு' : 'Iruthyapuram Parish'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-gold-500" />
                  <span className="text-charcoal-600 dark:text-charcoal-200 text-sm font-medium">{language === 'ta' ? '284 குடும்பங்கள்' : '284 Families'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PAST PRIESTS — Portrait grid ═══════ */}
      <section className="py-24 bg-ivory-100 dark:bg-charcoal-900">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="glass-pill text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
              Legacy
            </span>
            <h2 className="text-charcoal-700 dark:text-ivory-100">
              {language === 'ta' ? 'முன்னாள் பங்குத்தந்தைகள்' : 'Former Parish Priests'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {pastPriests.map((priest, index) => {
              const priestName = language === 'ta' ? (priest.nameTa || priest.name) : priest.name;
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={priest.id}
                  ref={el => { cardRefs.current[index] = el; }}
                  data-idx={index}
                  className={`glass-card p-4 rounded-2xl group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-[3/4] mb-4 rounded-xl">
                    <img
                      src={priest.photoPath}
                      alt={priestName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(priest.name) + '&background=C8A96E&color=fff&size=256';
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      {priest.dateofordination && (
                        <span className="text-white/80 text-xs flex items-center gap-1">
                          <Star size={12} /> {priest.dateofordination}
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="text-base font-serif text-charcoal-700 dark:text-ivory-100 mb-1">{priestName}</h4>
                  <span className="text-gold-600 dark:text-gold-400 text-[13px] font-semibold">{priest.years}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
