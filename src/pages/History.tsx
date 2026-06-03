import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import {
  BookOpen, CalendarHeart, Cross, Users, ArrowDown, MapPin, Clock,
  Map, Award, GraduationCap, Sparkles, Building2, Compass, CheckSquare,
  Heart, Landmark
} from 'lucide-react';
import { getFlatGalleryFolders } from '../data/galleryData';
import { historyData } from '../data/historyData';

export const History: React.FC = () => {
  const { t, language } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  // Use a gallery image for the hero background if available
  const folders = getFlatGalleryFolders();
  const heroBg = folders.length > 0 && folders[folders.length - 1]?.imagePaths[0]
    ? folders[folders.length - 1].imagePaths[0]
    : '/images/hero-bg1.jpg'; // fallback

  // Intersection Observer for section reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) setVisibleSections((prev) => new Set(prev).add(id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const registerRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current[id] = el;
  };

  // Association Icons matching the order in historyData
  const assocIcons = [
    <Sparkles size={20} className="text-accent" />,      // Balasabai
    <Compass size={20} className="text-accent" />,       // Siruvazhi
    <GraduationCap size={20} className="text-accent" />, // YCS
    <Users size={20} className="text-accent" />,         // Youth
    <Map size={20} className="text-accent" />,           // Village Dev
    <Award size={20} className="text-accent" />,         // Workers
    <Building2 size={20} className="text-accent" />,     // Kolping
    <BookOpen size={20} className="text-accent" />,      // Liturgy
    <Users size={20} className="text-accent" />,         // Choir
    <Cross size={20} className="text-accent" />,         // Altar Servers
    <BookOpen size={20} className="text-accent" />,      // Catechism
    <Users size={20} className="text-accent" />          // PPC
  ];

  return (
    <div>
      {/* ═══════ IMMERSIVE HERO WITH PARALLAX ═══════ */}
      <section className="history-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.25) contrast(1.2) saturate(0.8)'
          }}
        />
        {/* Animated gradient mesh overlay */}
        <div className="history-hero-mesh" />
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg-dark) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '10rem 0 6rem 0', textAlign: 'center', maxWidth: '900px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem',
            color: 'var(--text-secondary)'
          }}>
            <BookOpen size={18} className="text-accent" />
            <span style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {language === 'ta' ? 'எங்கள் பாரம்பரியம்' : 'Our Legacy'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            <span className="text-gradient">{t('historyHeroTitle') || 'Our History'}</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            {t('historyHeroDescription') || 'Tracing the roots of our parish and the faith of our ancestors from 1945 to the present day.'}
          </p>

          <div style={{ marginTop: '4rem', animation: 'bounce 2s infinite' }}>
            <ArrowDown size={32} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </section>

      {/* ═══════ HERO STATS BAR ═══════ */}
      <div
        ref={registerRef('stats-bar')}
        data-section-id="stats-bar"
        className={`history-stats-bar ${visibleSections.has('stats-bar') ? 'revealed' : ''}`}
      >
        <div className="container">
          <div className="history-stats-grid">
            <div className="history-stat-item">
              <Landmark size={24} className="text-accent" />
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>1945</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {language === 'ta' ? 'தொடக்கம்' : 'Founded'}
                </span>
              </div>
            </div>
            <div className="history-stat-divider" />
            <div className="history-stat-item">
              <Users size={24} className="text-accent" />
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{historyData.families}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {language === 'ta' ? 'குடும்பங்கள்' : 'Families'}
                </span>
              </div>
            </div>
            <div className="history-stat-divider" />
            <div className="history-stat-item">
              <Heart size={24} className="text-accent" />
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>{historyData.anbiyams}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {language === 'ta' ? 'அன்பியங்கள்' : 'Anbiyams'}
                </span>
              </div>
            </div>
            <div className="history-stat-divider" />
            <div className="history-stat-item">
              <Cross size={24} className="text-accent" />
              <div>
                <h4 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>12+</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {language === 'ta' ? 'அமைப்புகள்' : 'Organizations'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ INTRO / FOUNDATION SECTION ═══════ */}
      <section className="section">
        <div className="container">
          <div
            ref={registerRef('intro')}
            data-section-id="intro"
            className={`history-intro-grid ${visibleSections.has('intro') ? 'revealed' : ''}`}
          >
            {/* Left side: Text Card */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ThreeDTilt className="card" style={{ padding: '3rem', borderLeft: '4px solid var(--accent)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                  {t('historyIntroTitle') || 'The Beginning'}
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0' }}>
                  {t('historyIntroText') || 'Varavilai, known also as Vandikaravilai, was a part of Manivila parish belonging to the vicariate of Trivandrum. A small Catholic community of 10 families built a thatched church having Christ the King as their patron in 1943. Over the years, through the tireless efforts of parish priests and the growing Catholic community, Iruthyapuram Parish has become a beacon of faith and community development.'}
                </p>
              </ThreeDTilt>
            </div>

            {/* Right side: Images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
              <img
                src={folders[0]?.imagePaths[0] || '/images/hero-bg2.jpg'}
                alt="Church History"
                style={{ width: '100%', flex: '3', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', minHeight: '200px' }}
              />
              <img
                src={folders[1]?.imagePaths[0] || '/images/hero-bg3.jpg'}
                alt="Community"
                style={{ width: '100%', flex: '2', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', minHeight: '150px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PARISH FACTS & MASS TIMINGS ═══════ */}
      <section className="section section-dark">
        <div className="container">
          <div
            ref={registerRef('facts')}
            data-section-id="facts"
            className={`history-facts-grid ${visibleSections.has('facts') ? 'revealed' : ''}`}
          >
            {/* Quick Facts */}
            <ThreeDTilt className="card history-facts-card" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Building2 className="text-accent" size={28} />
                <span>{t('quickFactsTitle')}</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: t('statusLabel'), value: language === 'ta' ? historyData.statusTa : historyData.status },
                  { label: t('substationLabel'), value: language === 'ta' ? historyData.substationTa : historyData.substation },
                  { label: t('dioceseLabel'), value: language === 'ta' ? historyData.dioceseTa : historyData.diocese },
                  { label: t('vicariateLabel'), value: language === 'ta' ? historyData.vicariateTa : historyData.vicariate },
                  { label: t('districtLabel'), value: language === 'ta' ? historyData.districtTa : historyData.district },
                  { label: t('postOfficeLabel'), value: language === 'ta' ? historyData.postOfficeTa : historyData.postOffice }
                ].map((item, i) => (
                  <div key={i} className="history-fact-row">
                    <span className="history-fact-label">{item.label}</span>
                    <span className="history-fact-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </ThreeDTilt>

            {/* Mass Times & Directions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Mass Times */}
              <ThreeDTilt className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock className="text-accent" size={28} />
                  <span>{t('massTimesTitle')}</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="history-mass-time-card">
                    <CalendarHeart className="text-accent" size={24} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('sundayMassLabel')}</h4>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>{language === 'ta' ? historyData.sundayMassTa : historyData.sundayMass}</p>
                    </div>
                  </div>

                  <div className="history-mass-time-card">
                    <Clock className="text-accent" size={24} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('weekdayMassLabel')}</h4>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>{language === 'ta' ? historyData.weekdayMassTa : historyData.weekdayMass}</p>
                    </div>
                  </div>
                </div>
              </ThreeDTilt>

              {/* Route */}
              <ThreeDTilt className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin className="text-accent" size={22} />
                  <span>{t('routeTitle')}</span>
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {language === 'ta' ? historyData.routeTa : historyData.route}
                </p>
              </ThreeDTilt>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GROTTO, SCHOOL & VOCATIONS ═══════ */}
      <section className="section">
        <div className="container">
          <div
            ref={registerRef('grotto')}
            data-section-id="grotto"
            className={`history-grotto-grid ${visibleSections.has('grotto') ? 'revealed' : ''}`}
          >
            {/* Grotto & School */}
            <ThreeDTilt className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Building2 size={28} className="text-accent" />
                  <span>{t('grottosSchoolTitle')}</span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="history-landmark-card">
                    <div className="history-landmark-icon">
                      <Cross size={22} className="text-accent" />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{t('grottoLabel')}</h4>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                        {language === 'ta' ? historyData.grottoTa : historyData.grotto}
                      </p>
                    </div>
                  </div>

                  <div className="history-landmark-card">
                    <div className="history-landmark-icon">
                      <GraduationCap size={22} className="text-accent" />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{t('schoolLabel')}</h4>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                        {language === 'ta' ? historyData.schoolTa : historyData.school}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ThreeDTilt>

            {/* Vocations */}
            <ThreeDTilt className="card" style={{ padding: '2.5rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CalendarHeart className="text-accent" size={28} />
                <span>{t('vocationsTitle')}</span>
              </h2>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(language === 'ta' ? historyData.vocationsTa : historyData.vocations).map((vocation, idx) => (
                  <li key={idx} className="history-vocation-item">
                    <span className="history-vocation-number">{idx + 1}</span>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{vocation}</span>
                  </li>
                ))}
              </ul>
            </ThreeDTilt>

            {/* Festival */}
            <ThreeDTilt className="card history-festival-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="history-festival-icon-wrapper">
                  <Sparkles size={32} />
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{t('festivalLabel')}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                  {language === 'ta' ? historyData.festivalTa : historyData.festival}
                </p>
              </div>
            </ThreeDTilt>
          </div>
        </div>
      </section>

      {/* ═══════ PARISH ASSOCIATIONS & ORGANISATIONS ═══════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="section-title">
              <span>{t('associationsTitle')}</span>
            </h2>
          </div>

          <div
            ref={registerRef('assoc')}
            data-section-id="assoc"
            className={`history-assoc-grid ${visibleSections.has('assoc') ? 'revealed' : ''}`}
          >
            {historyData.associations.map((assoc, idx) => (
              <ThreeDTilt
                key={idx}
                className="card history-assoc-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div className="history-assoc-icon">
                  {assocIcons[idx] || <CheckSquare size={20} className="text-accent" />}
                </div>
                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {language === 'ta' ? assoc.nameTa : assoc.name}
                </span>
              </ThreeDTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PREMIUM TIMELINE SECTION ═══════ */}
      <section className="section" style={{ paddingBottom: '8rem', position: 'relative' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '6rem' }}>
            <h2 className="section-title">
              <span>{t('historyTimelineTitle') || 'Journey Through Time'}</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              {language === 'ta'
                ? '1945 முதல் இன்றுவரை இருதயபுரம் பங்கின் வரலாற்று நிகழ்வுகள்.'
                : 'Key milestones in the journey of Iruthyapuram Parish from 1945 to the present.'}
            </p>
          </div>

          <div className="premium-timeline">
            {/* Center glowing line */}
            <div className="premium-timeline-line"></div>

            {historyData.timeline.map((item, index) => {
              const icons = [<Cross size={24} />, <Users size={24} />, <CalendarHeart size={24} />];
              const NodeIcon = icons[index % icons.length];

              const itemEvent = language === 'ta' ? item.eventTa : item.event;
              const itemDesc = language === 'ta' ? item.descriptionTa : item.description;

              return (
                <div
                  key={index}
                  ref={registerRef(`timeline-${index}`)}
                  data-section-id={`timeline-${index}`}
                  className={`premium-timeline-item ${visibleSections.has(`timeline-${index}`) ? 'revealed' : ''}`}
                >
                  {/* Glowing Node Icon in the center */}
                  <div className="premium-timeline-node">
                    <div className="node-icon-wrapper">
                      {NodeIcon}
                    </div>
                  </div>

                  {/* Glassmorphic Content Card */}
                  <div className="premium-timeline-content">
                    <ThreeDTilt className="premium-timeline-card">
                      <div className="timeline-year-badge">
                        {item.year}
                      </div>
                      <h3 className="timeline-event-title">
                        {itemEvent}
                      </h3>
                      <p className="timeline-event-desc">
                        {itemDesc}
                      </p>
                    </ThreeDTilt>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CSS for bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
};
