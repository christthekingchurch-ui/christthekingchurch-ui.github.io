import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-800 text-charcoal-300 pt-20 pb-12 border-t border-charcoal-700">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Church Logo" className="w-10 h-10 object-contain" />
              <span className="font-serif text-xl font-semibold text-ivory-100 tracking-tight">{t('churchName')}</span>
            </div>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-gold-400 text-[11px] font-sans font-semibold uppercase tracking-[0.25em] mb-6">{t('footerQuickLinks')}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              {['home', 'history', 'gallery', 'priests', 'contact'].map(page => (
                <li key={page}>
                  <a 
                    href={`#${page}`} 
                    className="hover:text-gold-400 transition-colors inline-block"
                    onClick={(e) => { e.preventDefault(); handleLinkClick(page); }}
                  >
                    {t(`${page}Link`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info column */}
          <div>
            <h4 className="text-gold-400 text-[11px] font-sans font-semibold uppercase tracking-[0.25em] mb-6">{t('footerContactInfo')}</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-gold-500 shrink-0 mt-0.5" />
                <span className="text-charcoal-300">Iruthyapuram, Kerala, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-gold-500 shrink-0" />
                <span className="text-charcoal-300">04651-243375</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-gold-500 shrink-0" />
                <span className="text-charcoal-300 break-all">contact@christthekingchurch.com</span>
              </li>
            </ul>
          </div>

          {/* Service Times Column */}
          <div>
            <h4 className="text-gold-400 text-[11px] font-sans font-semibold uppercase tracking-[0.25em] mb-6">{t('footerServiceTimes')}</h4>
            <div className="flex gap-3 items-start text-sm">
              <Clock size={18} className="text-gold-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex justify-between gap-4 border-b border-charcoal-700 pb-2">
                  <span className="text-ivory-100 font-medium">Sunday Mass</span>
                  <span className="text-charcoal-300">8:00 AM</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-charcoal-700 pb-2">
                  <span className="text-ivory-100 font-medium">Evening Prayer</span>
                  <span className="text-charcoal-300">6:00 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-ivory-100 font-medium">Bible Study</span>
                  <span className="text-charcoal-300">Wed 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-charcoal-500 text-xs">{t('footerCopy')}</p>
          
          <div className="flex gap-3">
            <a 
              href="https://www.instagram.com/christthekingchurchiru/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full border border-charcoal-600 hover:border-gold-400 text-charcoal-400 hover:text-gold-400 transition-all flex items-center justify-center"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a 
              href="https://www.youtube.com/@ChristTheKingChurchIru" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full border border-charcoal-600 hover:border-gold-400 text-charcoal-400 hover:text-gold-400 transition-all flex items-center justify-center"
              aria-label="YouTube"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
