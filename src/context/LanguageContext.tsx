import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ta';

interface TranslationData {
  [key: string]: any;
}

const translations: Record<Language, TranslationData> = {
  en: {
    // Navbar
    churchName: "Christ the King Church",
    homeLink: "Home",
    historyLink: "History",
    galleryLink: "Gallery",
    priestsLink: "Parish Priests",
    priestsHeroDesc: "Honoring the dedicated priests who have faithfully served and guided our parish community over the years.",
    contactLink: "Contact",
    languageBtnLabel: "தமிழ்",

    // Hero Section
    heroTitle: "Welcome to Christ the King Church",
    heroDescription: "A community of faith, worship, and love in Iruthyapuram",
    contactBtn: "Contact Us",
    learnMoreBtn: "Learn More",

    // Mission Section
    missionTitle: "Our Mission",
    missionDescription: "At Christ the King Church, we strive to bring people closer to God through meaningful worship, compassionate service, and community building.",
    worshipTitle: "Worship",
    worshipText: "Experience meaningful worship that brings you closer to God through prayer, music, and fellowship.",
    serviceTitle: "Service",
    serviceText: "Serve our community with compassion and love, making a difference in the lives of those around us.",
    communityTitle: "Community",
    communityText: "Build lasting relationships within our church family, growing together in faith and fellowship.",

    // Services Section
    servicesTitle: "Our Services",
    sundayMassTitle: "Sunday Mass",
    sundayMassText: "Join us every Sunday at 8:00 AM for Holy Mass. Experience the presence of God in our beautiful sanctuary.",
    bibleStudyTitle: "Bible Study",
    bibleStudyText: "Deepen your understanding of God's word through our weekly Bible study sessions.",
    sundaySchoolTitle: "Sunday School",
    sundaySchoolText: "Nurturing young hearts in faith through engaging lessons and activities.",
    specialServicesTitle: "Special Services",
    specialServicesText: "Weddings, baptisms, and special celebrations in the presence of God.",

    // Gallery Preview
    galleryPreviewTitle: "Gallery",
    viewFullGalleryBtn: "View Full Gallery",

    // History Page
    historyHeroTitle: "A Short History",
    historyHeroDescription: "Discover the journey of Christ the King Church, Iruthyapuram, from its humble beginnings to its vibrant present.",
    historyIntroTitle: "Introduction",
    historyIntroText: "Varavilai, known also as Vandikaravilai, was a part of Manivila parish belonging to the vicariate of Trivandrum. A small Catholic community of 10 families built a thatched church having Christ the King as their patron in 1943. Over the years, through the tireless efforts of parish priests and the growing Catholic community, Iruthyapuram Parish has become a beacon of faith and community development.",
    historyTimelineTitle: "Historical Timeline",
    historyTimelineItems: [
      { year: "1943", event: "Founding", description: "A small Catholic community of 10 families built a thatched church having Christ the King as their patron." },
      { year: "1946", event: "Substation Established", description: "Piracode was made a substation of Siluvaipuram parish belonging to the diocese of Kottar." },
      { year: "1975", event: "New Church Blessed", description: "A tiled church was built with stones and blessed on 23rd February 1975 by Bishop Marianus Arokiasamy." },
      { year: "2002", event: "Parish Erected", description: "Iruthayapuram was erected as a new parish on 3rd June 2002, with Fr D.M. Sujan Kumar as the first parish priest." },
    ],

    quickFactsTitle: "Quick Facts & Profile",
    massTimesTitle: "Mass Timings",
    sundayMassLabel: "Sunday Mass",
    weekdayMassLabel: "Weekday Mass",
    associationsTitle: "Parish Associations & Organisations",
    vocationsTitle: "Vocations from Our Soil",
    grottosSchoolTitle: "Shrines & Education",
    grottoLabel: "Parish Shrine",
    schoolLabel: "Parish School",
    routeTitle: "Location & Directions",
    familiesLabel: "Parish Families",
    anbiyamsLabel: "Anbiyams (BCCs)",
    substationLabel: "Sub-station Church",
    vicariateLabel: "Vicariate",
    dioceseLabel: "Diocese",
    statusLabel: "Status",
    postOfficeLabel: "Post Office",
    districtLabel: "District",
    festivalLabel: "Annual Festival",

    // Contact Page
    contactHeroTitle: "Get in Touch",
    contactHeroDescription: "We'd love to hear from you. Reach out for any inquiries or prayer requests.",
    addressTitle: "Address",
    addressText: "Christ the King Church, Iruthyapuram, Kerala, India",
    contactDetailsTitle: "Contact Details",
    contactDetailsText: "Phone: 04651-243375\nEmail: contact@christthekingchurch.com",
    serviceTimesTitle: "Service Times",
    serviceTimesText: "Sunday Mass: 8:00 AM\nEvening Prayer: 6:00 PM\nBible Study: Wed 7:00 PM",
    formTitle: "Send Us a Message",
    formNameLabel: "Your Name",
    formEmailLabel: "Email Address",
    formMessageLabel: "Message",
    formSubmitBtn: "Send Message",
    formSuccessMsg: "Thank you for your message! We will get back to you soon.",

    // Footer
    footerDesc: "A community of faith, worship, and love serving Iruthyapuram since 1943.",
    footerQuickLinks: "Quick Links",
    footerContactInfo: "Contact Info",
    footerServiceTimes: "Service Times",
    footerCopy: "© 2026 Christ the King Church, Iruthyapuram. All rights reserved.",

    // Gallery Page
    galleryPageTitle: "Gallery",
    galleryPageDesc: "Explore the wonderful moments captured in the life of Christ the King Church, Iruthyapuram.",
    noGalleriesMsg: "No galleries available yet.",
    noImagesMsg: "No images found in this folder.",
    backToGalleryBtn: "Back to Gallery",
  },
  ta: {
    // Navbar
    churchName: "கிறிஸ்து அரசர் ஆலயம்",
    homeLink: "முகப்பு",
    historyLink: "வரலாறு",
    galleryLink: "படக்காட்சிகள்",
    priestsLink: "பங்கு தந்தையர்கள்",
    priestsHeroDesc: "எங்கள் பங்குச் சமூகத்தை வழிநடத்தி அர்ப்பணிப்புடன் பணியாற்றிய பங்குத்தந்தையர்களைப் போற்றி நன்றியறிதலுடன் நினைவு கூர்கிறோம்.",
    contactLink: "தொடர்பு",
    languageBtnLabel: "English",

    // Hero Section
    heroTitle: "கிறிஸ்து அரசர் ஆலயத்திற்கு உங்களை வரவேற்கிறோம்",
    heroDescription: "இருதயபுரத்தில் அன்பு, பக்தி மற்றும் தொழுகையின் சிறந்த சமூகம்",
    contactBtn: "தொடர்பு கொள்ள",
    learnMoreBtn: "மேலும் அறிய",

    // Mission Section
    missionTitle: "எங்கள் பணி",
    missionDescription: "கிறிஸ்து அரசர் ஆலயத்தில், அர்த்தமுள்ள வழிபாடு, அன்பான சேவை மற்றும் சமூகத்தை கட்டியெழுப்புவதன் மூலம் மக்களை கடவுளிடம் நெருங்கச் செய்ய முயற்சிக்கிறோம்.",
    worshipTitle: "வழிபாடு",
    worshipText: "ஜெபம், இசை மற்றும் கூட்டுறவு மூலம் கடவுளோடு உங்களை நெருங்கச் செய்யும் வழிபாட்டை அனுபவியுங்கள்.",
    serviceTitle: "சேவை",
    serviceText: "நம்மைச் சுற்றியுள்ளவர்களின் வாழ்க்கையில் மாற்றத்தை ஏற்படுத்தி, கருணையோடும் அன்போடும் நமது சமூகத்திற்கு சேவை செய்யுங்கள்.",
    communityTitle: "சமூகம்",
    communityText: "நமது திருச்சபை குடும்பத்திற்குள் நிலையான உறவுகளை உருவாக்கி, விசுவாசத்திலும் கூட்டுறவிலும் இணைந்து வளருங்கள்.",

    // Services Section
    servicesTitle: "எங்கள் சேவைகள்",
    sundayMassTitle: "ஞாயிறு திருப்பலி",
    sundayMassText: "ஒவ்வொரு ஞாயிற்றுக்கிழமையும் காலை 8:00 மணிக்கு திருப்பலியில் எங்களுடன் இணையுங்கள். எழில்மிகு ஆலயத்தில் இறைவனின் பிரசன்னத்தை உணருங்கள்.",
    bibleStudyTitle: "விவிலிய படிப்பு",
    bibleStudyText: "எங்கள் வாராந்திர விவிலிய படிப்பு அமர்வுகள் மூலம் இறைவனின் வார்த்தையை இன்னும் ஆழமாகப் புரிந்து கொள்ளுங்கள்.",
    sundaySchoolTitle: "மறைக்கல்வி பள்ளி",
    sundaySchoolText: "ஈர்க்கக்கூடிய பாடங்கள் மற்றும் செயல்பாடுகள் மூலம் இளம் நெஞ்சங்களை விசுவாசத்தில் வளர்ப்பது.",
    specialServicesTitle: "சிறப்பு வழிபாடுகள்",
    specialServicesText: "இறைவனின் முன்னிலையில் திருமணங்கள், திருமுழுக்குகள் மற்றும் பிற சிறப்பு கொண்டாட்டங்கள்.",

    // Gallery Preview
    galleryPreviewTitle: "படக்காட்சிகள்",
    viewFullGalleryBtn: "முழு படக்காட்சியைக் காண்க",

    // History Page
    historyHeroTitle: "ஒரு சுருக்கமான வரலாறு",
    historyHeroDescription: "இருதயபுரம் கிறிஸ்து அரசர் ஆலயத்தின் எளிய தொடக்கத்திலிருந்து அதன் துடிப்பான நிகழ்காலம் வரையிலான பயணத்தைக் கண்டறியுங்கள்.",
    historyIntroTitle: "அறிமுகம்",
    historyIntroText: "வரவிளை (வண்டிக்காரவிளை) திருவனந்தபுரம் விகாரியட்டைச் சேர்ந்த மணிவிளை பங்கின் ஒரு பகுதியாக இருந்தது. 1943 ஆம் ஆண்டில் 10 குடும்பங்களைக் கொண்ட ஒரு சிறிய கத்தோலிக்க சமூகம் கிறிஸ்து அரசரைத் தங்களது பாதுகாவலராகக் கொண்டு ஒரு கூரை ஆலயத்தை அமைத்தது. பல ஆண்டுகளின் தியாக உழைப்பாலும், பங்குத்தந்தையர் மற்றும் கத்தோலிக்க விசுவாசிகளின் முயற்சியாலும், இன்று இருதயபுரம் ஒரு சிறந்த ஆன்மீக மற்றும் சமூக வளர்ச்சி மையமாக விளங்குகிறது.",
    historyTimelineTitle: "வரலாற்று காலவரிசை",
    historyTimelineItems: [
      { year: "1943", event: "தொடக்கம்", description: "10 கத்தோலிக்க குடும்பங்கள் இணைந்து தங்களது பாதுகாவலராகிய கிறிஸ்து அரசருக்கு ஒரு கூரை ஆலயத்தைக் கட்டினர்." },
      { year: "1946", event: "கிளைப்பங்காக மாறியது", description: "கோட்டாறு மறைமாவட்டத்தைச் சேர்ந்த சிலுவைபுரம் பங்கின் கிளைப்பங்காக பிரகோடு மாற்றப்பட்டது." },
      { year: "1975", event: "புதிய ஆலயம் அர்ச்சிக்கப்பட்டது", description: "கற்களாலும் ஓடுகளாலும் கட்டப்பட்ட புதிய ஆலயத்தை 1975 பிப்ரவரி 23 அன்று ஆயர் மரியானுஸ் ஆரோக்கியசாமி அர்ச்சித்தார்." },
      { year: "2002", event: "தனிப் பங்காக உயர்த்தப்பட்டது", description: "2002 ஜூன் 3 அன்று இருதயபுரம் தனிப்பங்காக உயர்த்தப்பட்டு, அருட்பணி டி.எம். சுஜன் குமார் முதல் பங்குத்தந்தையாகப் பொறுப்பேற்றார்." },
    ],

    quickFactsTitle: "பங்கு விவரங்கள் மற்றும் சிறப்பம்சங்கள்",
    massTimesTitle: "வழிபாட்டு நேரங்கள்",
    sundayMassLabel: "ஞாயிறு திருப்பலி",
    weekdayMassLabel: "வாரநாட்களில் திருப்பலி",
    associationsTitle: "பங்கின் பங்கேற்பு அமைப்புகள்",
    vocationsTitle: "மண்ணின் இறையழைத்தல்கள்",
    grottosSchoolTitle: "குருசடி & பள்ளிக்கூடம்",
    grottoLabel: "பங்கின் குருசடி",
    schoolLabel: "பங்கின் பள்ளிக்கூடம்",
    routeTitle: "வழித்தடம் & அமைவிடம்",
    familiesLabel: "பங்கு குடும்பங்கள்",
    anbiyamsLabel: "அன்பியங்கள்",
    substationLabel: "கிளைப் பங்கு",
    vicariateLabel: "மறைவட்டம்",
    dioceseLabel: "மறைமாவட்டம்",
    statusLabel: "நிலை",
    postOfficeLabel: "அஞ்சல்",
    districtLabel: "மாவட்டம்",
    festivalLabel: "ஆண்டு பெருவிழா",

    // Contact Page
    contactHeroTitle: "தொடர்பு கொள்ள",
    contactHeroDescription: "உங்களது கேள்விகள் அல்லது ஜெப வேண்டுதல்களுக்கு எங்களை எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளலாம்.",
    addressTitle: "முகவரி",
    addressText: "கிறிஸ்து அரசர் ஆலயம், இருதயபுரம், கேரளா, இந்தியா",
    contactDetailsTitle: "தொடர்பு விவரங்கள்",
    contactDetailsText: "தொலைபேசி: 04651-243375\nமின்னஞ்சல்: contact@christthekingchurch.com",
    serviceTimesTitle: "வழிபாட்டு நேரங்கள்",
    serviceTimesText: "ஞாயிறு திருப்பலி: காலை 8:00 மணி\nமாலை ஜெபம்: மாலை 6:00 மணி\nவிவிலிய படிப்பு: புதன் மாலை 7:00 மணி",
    formTitle: "செய்தி அனுப்பவும்",
    formNameLabel: "உங்கள் பெயர்",
    formEmailLabel: "மின்னஞ்சல் முகவரி",
    formMessageLabel: "செய்தி",
    formSubmitBtn: "செய்தி அனுப்பு",
    formSuccessMsg: "செய்திக்கு நன்றி! விரைவில் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",

    // Footer
    footerDesc: "1943 முதல் இருதயபுரத்தில் விசுவாசம், வழிபாடு மற்றும் அன்பின் சேவையில் ஈடுபடும் கத்தோலிக்க சமூகம்.",
    footerQuickLinks: "விரைவு இணைப்புகள்",
    footerContactInfo: "தொடர்பு விவரங்கள்",
    footerServiceTimes: "வழிபாட்டு நேரங்கள்",
    footerCopy: "© 2026 கிறிஸ்து அரசர் ஆலயம், இருதயபுரம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    // Gallery Page
    galleryPageTitle: "படக்காட்சிகள்",
    galleryPageDesc: "இருதயபுரம் கிறிஸ்து அரசர் ஆலயத்தின் வரலாற்று மற்றும் திருவிழா நிகழ்வுகளின் புகைப்படங்களைக் கண்டறியுங்கள்.",
    noGalleriesMsg: "புகைப்பட தொகுப்புகள் எதுவும் இல்லை.",
    noImagesMsg: "இந்தத் தொகுப்பில் புகைப்படங்கள் எதுவும் இல்லை.",
    backToGalleryBtn: "தொகுப்புகளுக்குத் திரும்புக",
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('church_lang');
      return (saved === 'ta' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ta' : 'en';
      try {
        localStorage.setItem('church_lang', next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const t = (key: string): any => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
