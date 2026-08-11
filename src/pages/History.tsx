import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen, CalendarHeart, Cross, Users, MapPin, Clock,
  Award, GraduationCap, Sparkles, Building2, Compass, CheckSquare,
  Heart
} from 'lucide-react';
import { getFlatGalleryFolders } from '../data/galleryData';
import { historyData } from '../data/historyData';

export const History: React.FC = () => {
  const { t, language } = useLanguage();
  const [vis, setVis] = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLElement>>({});

  const folders = getFlatGalleryFolders();
  const heroBg = folders.length > 0 && folders[folders.length - 1]?.imagePaths[0]
    ? folders[folders.length - 1].imagePaths[0]
    : '/images/hero-bg1.jpg';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-reveal');
          if (id) setVis(prev => new Set(prev).add(id));
        }
      }),
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    const fallbackTimer = setTimeout(() => {
      const allIds = Array.from(document.querySelectorAll('[data-reveal]'))
        .map(el => el.getAttribute('data-reveal'))
        .filter(Boolean) as string[];
      setVis(new Set(allIds));
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  const reg = (id: string) => (el: HTMLDivElement | null) => { if (el) refs.current[id] = el; };
  const v = (id: string) => vis.has(id);

  const assocIcons = [
    <Sparkles size={18} />, <Compass size={18} />, <GraduationCap size={18} />,
    <Users size={18} />, <Award size={18} />, <Building2 size={18} />,
    <BookOpen size={18} />, <Users size={18} />, <Cross size={18} />,
    <BookOpen size={18} />, <Users size={18} />, <Heart size={18} />,
  ];

  return (
    <div className="bg-ivory-50 dark:bg-charcoal-800 min-h-screen">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})`, filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <span className="glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-3 inline-block">
            {language === 'ta' ? 'எங்கள் பாரம்பரியம்' : 'Our Legacy'}
          </span>
          <h1 className="text-white max-w-3xl">{t('historyHeroTitle') || 'Our History'}</h1>
          <p className="text-white/80 text-lg max-w-2xl mt-4 leading-relaxed">
            {t('historyHeroDescription') || 'Discover the journey of Christ the King Church, Iruthyapuram, from its humble beginnings to its vibrant present.'}
          </p>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <div ref={reg('stats')} data-reveal="stats" className={`max-w-[1400px] mx-auto px-6 md:px-10 py-16 transition-all duration-1000 ${v('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 border-b border-charcoal-100 dark:border-charcoal-700 pb-16">
          {[
            { value: '1945', label: language === 'ta' ? 'தொடக்கம்' : 'Founded' },
            { value: historyData.families, label: language === 'ta' ? 'குடும்பங்கள்' : 'Families' },
            { value: historyData.anbiyams, label: language === 'ta' ? 'அன்பியங்கள்' : 'Anbiyams' },
            { value: '13+', label: language === 'ta' ? 'அமைப்புகள்' : 'Organizations' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-4xl md:text-5xl font-serif text-charcoal-700 dark:text-ivory-100 mb-2">{stat.value}</h3>
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal-500 dark:text-charcoal-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ INTRO ═══════ */}
      <section className="py-20 md:py-32">
        <div ref={reg('intro')} data-reveal="intro" className={`max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center transition-all duration-1000 ${v('intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div>
            <span className="text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] mb-6 block">The Beginning</span>
            <h2 className="text-charcoal-700 dark:text-ivory-100 mb-8">{t('historyIntroTitle') || 'The Beginning'}</h2>
            <div className="w-12 h-[1px] bg-gold-400 mb-8" />
            <p className="text-charcoal-400 dark:text-charcoal-200 text-lg leading-[1.9]">
              {t('historyIntroText') || 'Varavilai, known also as Vandikaravilai, was a part of Manivila parish belonging to the vicariate of Trivandrum. A small Catholic community of 10 families built a thatched church having Christ the King as their patron in 1943.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={folders[0]?.imagePaths[0] || '/images/hero-bg2.jpg'} alt="Church" className="col-span-2 h-72 w-full object-cover" />
            <img src={folders[1]?.imagePaths[0] || '/images/hero-bg3.jpg'} alt="Community" className="h-48 w-full object-cover" />
            <img src={folders[2]?.imagePaths?.[0] || '/images/hero-bg1.jpg'} alt="Parish" className="h-48 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ═══════ FACTS & MASS TIMINGS ═══════ */}
      <section className="py-24 bg-ivory-100 dark:bg-charcoal-900">
        <div ref={reg('facts')} data-reveal="facts" className={`max-w-[1100px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-1000 ${v('facts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Quick Facts */}
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="text-2xl font-serif text-charcoal-700 dark:text-ivory-100 mb-6 flex items-center gap-3">
              <Building2 className="text-gold-500" size={22} />
              {t('quickFactsTitle')}
            </h3>
            <div className="flex flex-col divide-y divide-charcoal-100 dark:divide-charcoal-700">
              {[
                { label: t('statusLabel'), value: language === 'ta' ? historyData.statusTa : historyData.status },
                { label: t('substationLabel'), value: language === 'ta' ? historyData.substationTa : historyData.substation },
                { label: t('dioceseLabel'), value: language === 'ta' ? historyData.dioceseTa : historyData.diocese },
                { label: t('vicariateLabel'), value: language === 'ta' ? historyData.vicariateTa : historyData.vicariate },
                { label: t('districtLabel'), value: language === 'ta' ? historyData.districtTa : historyData.district },
                { label: t('postOfficeLabel'), value: language === 'ta' ? historyData.postOfficeTa : historyData.postOffice }
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-3">
                  <span className="text-charcoal-300 dark:text-charcoal-400 text-sm font-medium">{item.label}</span>
                  <span className="text-charcoal-700 dark:text-ivory-100 font-medium text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mass & Route */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-serif text-charcoal-700 dark:text-ivory-100 mb-6 flex items-center gap-3">
                <Clock className="text-gold-500" size={22} />
                {t('massTimesTitle')}
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 glass-panel p-5 rounded-xl">
                  <CalendarHeart className="text-gold-500 shrink-0" size={22} />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal-300 font-semibold mb-1">{t('sundayMassLabel')}</p>
                    <p className="text-charcoal-700 dark:text-ivory-100 font-semibold">{language === 'ta' ? historyData.sundayMassTa : historyData.sundayMass}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 glass-panel p-5 rounded-xl">
                  <Clock className="text-gold-500 shrink-0" size={22} />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal-300 font-semibold mb-1">{t('weekdayMassLabel')}</p>
                    <p className="text-charcoal-700 dark:text-ivory-100 font-semibold">{language === 'ta' ? historyData.weekdayMassTa : historyData.weekdayMass}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl">
              <h4 className="text-lg font-serif text-charcoal-700 dark:text-ivory-100 mb-3 flex items-center gap-2">
                <MapPin className="text-gold-500" size={18} />
                {t('routeTitle')}
              </h4>
              <p className="text-charcoal-400 dark:text-charcoal-200 leading-relaxed text-[15px]">
                {language === 'ta' ? historyData.routeTa : historyData.route}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ASSOCIATIONS ═══════ */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="glass-pill text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
              Community
            </span>
            <h2 className="text-charcoal-700 dark:text-ivory-100">{t('associationsTitle')}</h2>
          </div>
          <div ref={reg('assoc')} data-reveal="assoc" className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-1000 ${v('assoc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {historyData.associations.map((assoc, idx) => (
              <div key={idx} className="glass-card flex items-center gap-4 py-4 px-5 rounded-xl group">
                <div className="text-gold-500 shrink-0">{assocIcons[idx] || <CheckSquare size={18} />}</div>
                <span className="text-charcoal-600 dark:text-charcoal-200 text-sm font-medium group-hover:text-charcoal-700 dark:group-hover:text-ivory-100 transition-colors">
                  {language === 'ta' ? assoc.nameTa : assoc.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TIMELINE ═══════ */}
      <section className="py-24 bg-ivory-100 dark:bg-charcoal-900 relative">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <span className="glass-pill text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
              Milestones
            </span>
            <h2 className="text-charcoal-700 dark:text-ivory-100">{t('historyTimelineTitle') || 'Journey Through Time'}</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] bg-charcoal-100 dark:bg-charcoal-700 md:-translate-x-[0.5px]" />

            {historyData.timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={reg(`tl-${index}`)}
                  data-reveal={`tl-${index}`}
                  className={`relative flex items-start mb-14 last:mb-0 transition-all duration-1000 ${v(`tl-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-gold-400 border-2 border-ivory-100 dark:border-charcoal-900 z-10 mt-2" />

                  <div className="hidden md:block md:w-1/2" />

                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <div className="glass-card p-6 rounded-2xl">
                      <span className="text-gold-500 text-[12px] font-sans font-bold tracking-[0.1em] mb-2 block">{item.year}</span>
                      <h4 className="text-lg font-serif text-charcoal-700 dark:text-ivory-100 mb-2">
                        {language === 'ta' ? item.eventTa : item.event}
                      </h4>
                      <p className="text-charcoal-400 dark:text-charcoal-200 text-[15px] leading-relaxed">
                        {language === 'ta' ? item.descriptionTa : item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
