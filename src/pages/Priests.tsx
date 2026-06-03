import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import priestsData from '../data/priests.json';
import { CalendarDays, Church, Crown, Star, Users } from 'lucide-react';

export const Priests: React.FC = () => {
  const { t, language } = useLanguage();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisibleCards((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Current priest is last in array, past priests are the rest
  const currentPriest = priestsData[priestsData.length - 1];
  const pastPriests = priestsData.slice(0, -1);

  const currentName = language === 'ta' ? (currentPriest.nameTa || currentPriest.name) : currentPriest.name;
  const currentDesc = language === 'ta' ? (currentPriest.descriptionTa || currentPriest.description) : currentPriest.description;

  return (
    <div>
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="priests-hero">
        <div className="priests-hero-bg" />
        <div className="priests-hero-gradient" />
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '8rem 0 3rem 0', textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', lineHeight: '1.1' }}>
            <span className="text-gradient">{t('priestsLink') || 'Parish Priests'}</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto' }}>
            {t('priestsHeroDesc') || 'Honoring the dedicated priests who have faithfully served and guided our parish community over the years.'}
          </p>
        </div>
      </section>

      {/* ═══════ CURRENT PRIEST SPOTLIGHT ═══════ */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)',
              background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)',
              color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              <Crown size={16} />
              {language === 'ta' ? 'தற்போதைய பங்குத்தந்தை' : 'Current Parish Priest'}
            </div>
          </div>

          <div className="current-priest-spotlight">
            {/* Portrait */}
            <div className="current-priest-portrait">
              <div className="current-priest-portrait-wrapper">
                <div className="current-priest-portrait-frame">
                  <img
                    src={currentPriest.photoPath}
                    alt={currentName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentPriest.name) + '&background=0D8ABC&color=fff&size=512';
                    }}
                  />
                </div>
                {/* Glowing border ring — outside overflow:hidden */}
                <div className="current-priest-glow-ring" />
              </div>
            </div>

            {/* Info */}
            <div className="current-priest-info">
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                {currentName}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span className="priest-meta-badge">
                  <CalendarDays size={16} />
                  {currentPriest.years}
                </span>
                {currentPriest.dateofordination && (
                  <span className="priest-meta-badge">
                    <Star size={16} />
                    {language === 'ta' ? 'திருநிலைப்படுத்தல்: ' : 'Ordained: '}{currentPriest.dateofordination}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                {currentDesc}
              </p>
              <div className="current-priest-stats">
                <div className="current-priest-stat">
                  <Church size={18} className="text-accent" />
                  <span>{language === 'ta' ? 'இருதயபுரம் பங்கு' : 'Iruthyapuram Parish'}</span>
                </div>
                <div className="current-priest-stat">
                  <Users size={18} className="text-accent" />
                  <span>{language === 'ta' ? '284 குடும்பங்கள்' : '284 Families'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PAST PRIESTS — ALTERNATING TIMELINE CARDS ═══════ */}
      <section className="section section-dark" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title">
              <span>{language === 'ta' ? 'முன்னாள் பங்குத்தந்தைகள்' : 'Former Parish Priests'}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              {language === 'ta'
                ? 'இருதயபுரம் பங்கை வழிநடத்திய அருட்பணியாளர்களின் பணிகள்.'
                : 'The faithful servants who shepherded our community through the years.'}
            </p>
          </div>

          <div className="priests-timeline">
            {/* Vertical line */}
            <div className="priests-timeline-line" />

            {pastPriests.map((priest, index) => {
              const priestName = language === 'ta' ? (priest.nameTa || priest.name) : priest.name;
              const priestDescription = language === 'ta' ? (priest.descriptionTa || priest.description) : priest.description;
              const isVisible = visibleCards.has(index);
              const isOdd = index % 2 === 1; // Manually alternate: even=right, odd=left

              return (
                <div
                  key={priest.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  data-idx={index}
                  className={`priests-timeline-item ${isVisible ? 'revealed' : ''} ${isOdd ? 'priests-timeline-item--left' : ''}`}
                >
                  {/* Glowing node on the timeline */}
                  <div className="priests-timeline-node">
                    <span className="priests-timeline-node-year">{priest.years.split(' ')[0]}</span>
                  </div>

                  {/* Card content */}
                  <div className="priests-timeline-content">
                    <ThreeDTilt className="priests-card" style={{ padding: 0, overflow: 'hidden' }}>
                      <div className="priests-card-inner">
                        {/* Photo */}
                        <div className="priests-card-photo">
                          <img
                            src={priest.photoPath}
                            alt={priestName}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(priest.name) + '&background=0D8ABC&color=fff&size=256';
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="priests-card-details">
                          <div className="priests-card-year-badge">{priest.years}</div>
                          <h3 className="priests-card-name">{priestName}</h3>
                          {priest.dateofordination && (
                            <div className="priests-card-ordination">
                              <Star size={14} />
                              <span>{language === 'ta' ? 'திருநிலைப்படுத்தல்: ' : 'Ordained: '}{priest.dateofordination}</span>
                            </div>
                          )}
                          <p className="priests-card-desc">{priestDescription}</p>
                        </div>
                      </div>
                    </ThreeDTilt>
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
