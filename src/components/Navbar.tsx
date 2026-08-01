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

  // Close the drawer on Escape, and lock body scroll while it is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

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
          
          {/* Language + theme controls, shown only inside the mobile drawer */}
          <li className="nav-menu-actions">
            <button className="btn-lang" onClick={toggleLanguage}>
              <Globe size={16} />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
            <button className="btn-lang btn-lang-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </li>
        </ul>

        {/* Action Buttons & Hamburger */}
        <div className="nav-actions">
          {/* Language + theme controls, shown only on desktop */}
          <div className="nav-actions-desktop">
            <button className="btn-lang btn-lang-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="btn-lang" onClick={toggleLanguage}>
              <Globe size={16} />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Backdrop — tapping outside the drawer closes it */}
      <div
        className={`nav-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
    </nav>
  );
};
