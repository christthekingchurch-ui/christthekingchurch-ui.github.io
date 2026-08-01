import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ThreeDTilt } from '../components/ThreeDTilt';
import { MapPin, PhoneCall, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="section text-center" 
        style={{ 
          padding: '8rem 0 4rem 0',
          background: 'var(--gradient-hero)',
          borderBottom: '1px solid var(--border-glass)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.15)', color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <PhoneCall size={28} />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('contactHeroTitle')}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            {t('contactHeroDescription')}
          </p>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {/* Contact Details Card */}
            <ThreeDTilt className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', flexShrink: 0 }}>
                  <PhoneCall size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Call Us</h4>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>04651-243375</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</h4>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Christ the King Church,<br/>Iruthyapuram, Kerala, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', flexShrink: 0 }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Working Hours</h4>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.2rem' }}>Sunday Mass: 8:00 AM</p>
                  <p style={{ color: 'var(--text-secondary)' }}>Evening Prayer: 6:00 PM<br/>Bible Study: Wed 7:00 PM</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://share.google/mBA5gLBNpQcTqJ6iv" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  style={{ flex: '1 1 140px', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', padding: '0.75rem' }}
                >
                  <MapPin size={18} />
                  <span>Get Directions</span>
                </a>
                <a 
                  href="https://wa.me/9104651243375" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn" 
                  style={{ flex: '1 1 140px', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', background: '#075E54', color: 'white', padding: '0.75rem', border: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </ThreeDTilt>

            {/* Map Embed Card */}
            <ThreeDTilt className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Christ+The+King+Church+Irruthayapuram+(Roman+Catholic)&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '350px', flex: 1 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
              <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                    {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Google Reviews</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a href="https://www.instagram.com/christthekingchurchiru/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://www.youtube.com/@ChristTheKingChurchIru" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#ff0000', color: 'white', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                </div>
              </div>
            </ThreeDTilt>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section section-dark">
        <div className="container" style={{ maxWidth: '650px' }}>
          <h2 className="section-title text-center">
            <span>{t('formTitle')}</span>
          </h2>

          <ThreeDTilt className="card" style={{ padding: '2.5rem 3rem', marginTop: '2rem' }}>
            {isSuccess && (
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.5rem',
                marginBottom: '1.5rem',
                color: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <CheckCircle2 size={20} />
                <span>{t('formSuccessMsg')}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t('formNameLabel')}</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="form-control"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('formEmailLabel')}</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="form-control"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t('formMessageLabel')}</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5} 
                  required 
                  className="form-control"
                  placeholder="Your message or prayer request..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>{t('formSubmitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </ThreeDTilt>
        </div>
      </section>
    </div>
  );
};
