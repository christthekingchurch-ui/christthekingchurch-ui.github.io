import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ChevronDown, Clock, BookOpen, Heart, Users } from 'lucide-react';
import { getPreviewImages } from '../data/galleryData';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const heroImages = ['/images/hero-bg1.jpg', '/images/hero-bg2.jpg', '/images/hero-bg3.jpg'];

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [heroIdx, setHeroIdx] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx(prev => (prev + 1) % heroImages.length), 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ids = ['about', 'pillars', 'services', 'gallery'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal');
            if (id) setVisibleSections(prev => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    ids.forEach(id => {
      const el = document.querySelector(`[data-reveal="${id}"]`);
      if (el) observer.observe(el);
    });

    const fallbackTimer = setTimeout(() => {
      setVisibleSections(new Set(ids));
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const ref = (id: string) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current[id] = el;
  };

  const vis = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-800">

      {/* ═══════ HERO — Full-viewport cinematic ═══════ */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Ken Burns background */}
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${i === heroIdx ? 'animate-ken-burns' : ''}`}
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === heroIdx ? 1 : 0,
              filter: 'brightness(0.35)',
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/70 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Iruthyapuram Parish • Est. 1943
          </span>

          <h1 className="text-white font-serif leading-[1.05] mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {t('heroTitle')}
          </h1>

          <div className="w-16 h-[1px] bg-gold-400 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }} />

          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>
            <button
              className="flex items-center justify-center gap-3 bg-gold-400 hover:bg-gold-500 text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => onNavigate('contact')}
            >
              {t('contactBtn')} <ArrowRight size={16} />
            </button>
            <button
              className="flex items-center justify-center gap-3 bg-transparent border border-white/25 text-white/90 hover:bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300"
              onClick={() => onNavigate('history')}
            >
              {t('learnMoreBtn')}
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ═══════ ABOUT — Editorial split ═══════ */}
      <section className="py-28 md:py-40">
        <div
          ref={ref('about')}
          data-reveal="about"
          className={`max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-[1200ms] ${vis('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
            <img
              src={heroImages[1]}
              alt="Christ the King Church"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ivory-50 dark:from-charcoal-800 to-transparent" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8 lg:pr-8">
            <span className="text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em]">
              About Our Parish
            </span>
            <h2 className="text-charcoal-700 dark:text-ivory-100 leading-[1.1]">
              {t('missionTitle')}
            </h2>
            <div className="w-12 h-[1px] bg-gold-400" />
            <p className="text-charcoal-400 dark:text-charcoal-200 text-lg leading-[1.9]">
              {t('missionDescription')}
            </p>
            <button
              className="self-start flex items-center gap-3 text-gold-600 dark:text-gold-400 text-sm font-semibold uppercase tracking-[0.15em] group mt-4"
              onClick={() => onNavigate('history')}
            >
              Explore Our History
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ PILLARS — 3 minimal cards ═══════ */}
      <section className="py-24 md:py-32 bg-ivory-100 dark:bg-charcoal-900">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <span className="glass-pill text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
              Our Foundation
            </span>
            <h2 className="text-charcoal-700 dark:text-ivory-100">{t('missionTitle')}</h2>
          </div>

          <div
            ref={ref('pillars')}
            data-reveal="pillars"
            className={`grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 transition-all duration-[1200ms] ${vis('pillars') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {[
              { icon: <Heart size={24} />, title: t('worshipTitle'), text: t('worshipText') },
              { icon: <Users size={24} />, title: t('serviceTitle'), text: t('serviceText') },
              { icon: <BookOpen size={24} />, title: t('communityTitle'), text: t('communityText') },
            ].map((card, i) => (
              <div key={i} className="glass-card text-center flex flex-col items-center gap-6 p-8 rounded-2xl" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="text-gold-500">{card.icon}</div>
                <h3 className="text-2xl text-charcoal-700 dark:text-ivory-100 font-serif">{card.title}</h3>
                <div className="w-8 h-[1px] bg-gold-300" />
                <p className="text-charcoal-400 dark:text-charcoal-200 leading-relaxed max-w-sm">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES — Clean list ═══════ */}
      <section className="py-28 md:py-40">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <span className="text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block">Schedule</span>
            <h2 className="text-charcoal-700 dark:text-ivory-100">{t('servicesTitle')}</h2>
          </div>

          <div
            ref={ref('services')}
            data-reveal="services"
            className={`flex flex-col divide-y divide-charcoal-100 dark:divide-charcoal-700 transition-all duration-[1200ms] ${vis('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {[
              { icon: <Clock size={20} />, title: t('sundayMassTitle'), text: t('sundayMassText') },
              { icon: <BookOpen size={20} />, title: t('bibleStudyTitle'), text: t('bibleStudyText') },
              { icon: <Heart size={20} />, title: t('sundaySchoolTitle'), text: t('sundaySchoolText') },
              { icon: <Users size={20} />, title: t('specialServicesTitle'), text: t('specialServicesText') },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-6 py-8 group">
                <div className="text-gold-500 mt-1 shrink-0">{s.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-serif text-charcoal-700 dark:text-ivory-100 mb-2 group-hover:text-gold-600 transition-colors">{s.title}</h4>
                  <p className="text-charcoal-400 dark:text-charcoal-200 text-[15px]">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY — Immersive preview ═══════ */}
      <section className="py-24 md:py-32 bg-charcoal-700 dark:bg-charcoal-900">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
            <h2 className="text-white">{t('galleryPreviewTitle')}</h2>
          </div>

          <div
            ref={ref('gallery')}
            data-reveal="gallery"
            className={`transition-all duration-[1200ms] ${vis('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {(() => {
              const previewImages = getPreviewImages(3);
              if (previewImages.length === 0) {
                return <div className="text-center text-white/40"><p>No images yet.</p></div>;
              }

              const feature = previewImages[0];
              const smaller = previewImages.slice(1);

              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Feature */}
                  <div
                    className="lg:col-span-2 group relative h-[400px] lg:h-[550px] overflow-hidden cursor-pointer"
                    onClick={() => onNavigate('gallery')}
                  >
                    <img src={feature.src} alt={feature.alt} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12">
                      <span className="text-gold-300 text-[11px] uppercase tracking-[0.3em] font-sans mb-2 block">{feature.year}</span>
                      <h3 className="text-white text-2xl md:text-3xl font-serif">{feature.folder}</h3>
                    </div>
                  </div>

                  {/* Side images */}
                  {smaller.length > 0 && (
                    <div className="flex flex-col gap-4 h-[400px] lg:h-[550px]">
                      {smaller.map((img, i) => (
                        <div
                          key={i}
                          className="flex-1 group relative overflow-hidden cursor-pointer"
                          onClick={() => onNavigate('gallery')}
                        >
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 p-6">
                            <span className="text-gold-300 text-[10px] uppercase tracking-[0.3em] font-sans mb-1 block">{img.year}</span>
                            <h4 className="text-white text-lg font-serif">{img.folder}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-3 border border-white/20 text-white/80 hover:text-white hover:border-gold-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300"
              onClick={() => onNavigate('gallery')}
            >
              {t('viewFullGalleryBtn')} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="bg-gold-400 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-6 !text-3xl md:!text-4xl">{t('contactBtn')}</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            We welcome everyone to join our community of faith, love, and service.
          </p>
          <button
            className="bg-white text-charcoal-700 hover:bg-ivory-50 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            onClick={() => onNavigate('contact')}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};
