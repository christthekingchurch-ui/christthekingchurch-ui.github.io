import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Globe, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelKey: 'homeLink' },
    { id: 'history', labelKey: 'historyLink' },
    { id: 'gallery', labelKey: 'galleryLink' },
    { id: 'priests', labelKey: 'priestsLink' },
    { id: 'contact', labelKey: 'contactLink' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`header-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo Section */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <img src="/images/logo.png" alt="Church Logo" />
          <span className="nav-logo-text">{t('churchName')}</span>
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${currentPage === item.id || (currentPage.startsWith('gallery-') && item.id === 'gallery') ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
          
          {/* Action Buttons inside Mobile Menu */}
          <li className="mobile-only" style={{ display: isMobileMenuOpen ? 'flex' : 'none', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <button className="btn-lang" onClick={toggleLanguage}>
              <Globe size={16} />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
            <button className="btn-lang" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>

        {/* Action Buttons & Hamburger */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          
          <button className="btn-lang" onClick={toggleTheme} aria-label="Toggle theme" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Switcher for Desktop */}
          <button className="btn-lang" style={{ display: 'flex' }} onClick={toggleLanguage}>
            <Globe size={16} />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            className="menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
