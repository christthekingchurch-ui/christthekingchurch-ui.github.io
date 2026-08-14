import React, { useState } from 'react';
import { useLanguage } from '../context/languageContextValue';
import { MapPin, PhoneCall, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { historyData } from '../data/historyData';

export const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-ivory-50 dark:bg-charcoal-800 min-h-screen">

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/images/hero-bg1.jpg)`, filter: 'brightness(0.35)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <span className="glass-pill text-gold-300 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-3 inline-block">
            Reach Out
          </span>
          <h1 className="text-white max-w-3xl">{t('contactHeroTitle')}</h1>
          <p className="text-white/80 text-lg max-w-2xl mt-4 leading-relaxed">
            {t('contactHeroDescription')}
          </p>
        </div>
      </section>

      {/* ═══════ MAP + DETAILS ═══════ */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">

          {/* Map */}
          <div className="h-[450px] lg:h-auto overflow-hidden rounded-3xl border border-charcoal-100 dark:border-charcoal-700 shadow-lg">
            <iframe
              title="Map showing Christ the King Church, Iruthyapuram"
              src="https://maps.google.com/maps?q=Christ+The+King+Church+Irruthayapuram+(Roman+Catholic)&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="lg:pl-16 flex flex-col justify-center gap-10">
            <div className="flex items-start gap-5">
              <PhoneCall size={22} className="text-gold-500 mt-1 shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-bold mb-1">Call Us</p>
                <a href="tel:+914651243375" className="text-charcoal-700 dark:text-ivory-100 text-lg font-semibold hover:text-gold-600 transition-colors">04651-243375</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <MapPin size={22} className="text-gold-500 mt-1 shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-bold mb-1">Address</p>
                <p className="text-charcoal-700 dark:text-ivory-100 font-semibold">Christ the King Church,<br/>Iruthyapuram, Kulapuram P.O.,<br/>Kanyakumari District, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <Clock size={22} className="text-gold-500 mt-1 shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-bold mb-2">{t('massTimesTitle')}</p>
                <ul className="flex flex-col gap-1">
                  {historyData.massSchedule.map(mass => (
                    <li key={mass.label} className="flex flex-wrap gap-x-2 text-charcoal-700 dark:text-ivory-100">
                      <span className="font-semibold">{language === 'ta' ? mass.labelTa : mass.label}:</span>
                      <span>{language === 'ta' ? mass.timeTa : mass.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://share.google/mBA5gLBNpQcTqJ6iv" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-charcoal-100 dark:border-charcoal-600 text-charcoal-600 dark:text-charcoal-200 text-sm font-semibold hover:border-gold-400 hover:text-gold-600 transition-all"
              >
                <MapPin size={16} /> Directions
              </a>
              <a href="https://wa.me/914651243375" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-all"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FORM ═══════ */}
      <section className="py-24 bg-ivory-100 dark:bg-charcoal-900">
        <div className="max-w-2xl mx-auto px-6">
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="text-center mb-12">
              <span className="glass-pill text-gold-500 text-[11px] font-sans font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block">
                Message
              </span>
              <h2 className="text-charcoal-700 dark:text-ivory-100">{t('formTitle')}</h2>
            </div>

          {isSuccess && (
            <div className="flex items-center gap-3 p-5 mb-8 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
              <CheckCircle2 size={20} />
              <span className="font-medium text-sm">{t('formSuccessMsg')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <label htmlFor="contact-name" className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-semibold mb-3 block">{t('formNameLabel')}</label>
              <input
                id="contact-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} required
                className="w-full bg-transparent border-b border-charcoal-200 dark:border-charcoal-600 py-3 text-charcoal-700 dark:text-ivory-100 focus:border-gold-400 outline-none transition-colors placeholder:text-charcoal-300 dark:placeholder:text-charcoal-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-semibold mb-3 block">{t('formEmailLabel')}</label>
              <input
                id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} required
                className="w-full bg-transparent border-b border-charcoal-200 dark:border-charcoal-600 py-3 text-charcoal-700 dark:text-ivory-100 focus:border-gold-400 outline-none transition-colors placeholder:text-charcoal-300 dark:placeholder:text-charcoal-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.15em] text-charcoal-500 dark:text-charcoal-200 font-semibold mb-3 block">{t('formMessageLabel')}</label>
              <textarea
                id="contact-message" name="message" value={formData.message} onChange={handleInputChange} rows={4} required
                className="w-full bg-transparent border-b border-charcoal-200 dark:border-charcoal-600 py-3 text-charcoal-700 dark:text-ivory-100 focus:border-gold-400 outline-none transition-colors resize-none placeholder:text-charcoal-300 dark:placeholder:text-charcoal-500"
                placeholder="Your message or prayer request..."
              />
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="self-start flex items-center gap-3 bg-gold-400 hover:bg-gold-500 disabled:bg-charcoal-200 text-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 mt-4"
            >
              {isSubmitting ? 'Sending...' : <><Send size={16} /> {t('formSubmitBtn')}</>}
            </button>
          </form>
          </div>
        </div>
      </section>
    </div>
  );
};
