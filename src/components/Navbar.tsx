import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/languageContextValue';
import { useTheme } from '../context/themeContextValue';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', handleKeyDown); };
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

  // Header is transparent with white text over dark hero images on ALL pages when not scrolled
  const isHeroDarkBg = !isScrolled;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-4'
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img src="/images/logo.png" alt="Church Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" />
            <span className={`font-serif text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isHeroDarkBg ? 'text-white' : 'text-charcoal-700 dark:text-ivory-100'
            }`}>
              {t('churchName')}
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {navItems.map(item => {
              const isActive = currentPage === item.id || (currentPage.startsWith('gallery-') && item.id === 'gallery');
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`relative text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 pb-1 ${
                      isActive
                        ? (isHeroDarkBg ? 'text-gold-300' : 'text-gold-600 dark:text-gold-400')
                        : isHeroDarkBg
                          ? 'text-white/80 hover:text-white'
                          : 'text-charcoal-600 hover:text-charcoal-900 dark:text-charcoal-300 dark:hover:text-ivory-100'
                    }`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  >
                    {t(item.labelKey)}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className={`p-2 rounded-full transition-all duration-300 ${
                isHeroDarkBg
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50 dark:text-charcoal-300 dark:hover:bg-charcoal-700'
              }`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 border ${
                isHeroDarkBg
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-charcoal-300 text-charcoal-700 hover:bg-charcoal-50 dark:border-charcoal-600 dark:text-charcoal-200 dark:hover:bg-charcoal-700'
              }`}
              onClick={toggleLanguage}
            >
              <Globe size={14} />
              <span>{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isHeroDarkBg ? 'text-white' : 'text-charcoal-700 dark:text-ivory-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-ivory-50 dark:bg-charcoal-800 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}>
          <div className="p-6 flex items-center justify-between border-b border-charcoal-50 dark:border-charcoal-700">
            <span className="font-serif text-lg text-charcoal-700 dark:text-ivory-100">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal-400 hover:text-charcoal-700 dark:hover:text-ivory-100">
              <X size={22} />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
            {navItems.map(item => {
              const isActive = currentPage === item.id || (currentPage.startsWith('gallery-') && item.id === 'gallery');
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block py-3 px-4 rounded-lg text-base font-medium tracking-wide transition-all ${
                      isActive
                        ? 'text-gold-600 bg-gold-50 dark:bg-gold-900/20'
                        : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700'
                    }`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="p-6 border-t border-charcoal-50 dark:border-charcoal-700 flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-ivory-100 dark:bg-charcoal-700 text-charcoal-600 dark:text-charcoal-200 font-medium text-sm"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
            </button>
            <button
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gold-400 text-white font-medium text-sm"
              onClick={toggleLanguage}
            >
              <Globe size={18} />
              {language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
