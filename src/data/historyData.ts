export interface HistoryTimelineItem {
  year: string;
  event: string;
  eventTa: string;
  description: string;
  descriptionTa: string;
}

export interface AssociationItem {
  name: string;
  nameTa: string;
}

export interface HistoryData {
  location: string;
  locationTa: string;
  postOffice: string;
  postOfficeTa: string;
  district: string;
  districtTa: string;
  diocese: string;
  dioceseTa: string;
  vicariate: string;
  vicariateTa: string;
  status: string;
  statusTa: string;
  substation: string;
  substationTa: string;
  families: number;
  anbiyams: number;
  sundayMass: string;
  sundayMassTa: string;
  weekdayMass: string;
  weekdayMassTa: string;
  festival: string;
  festivalTa: string;
  route: string;
  routeTa: string;
  
  vocations: string[];
  vocationsTa: string[];
  
  grotto: string;
  grottoTa: string;
  school: string;
  schoolTa: string;
  
  associations: AssociationItem[];
  timeline: HistoryTimelineItem[];
}

export const historyData: HistoryData = {
  location: "Iruthyapuram",
  locationTa: "இருதயபுரம்",
  postOffice: "Kulapuram P.O.",
  postOfficeTa: "குளப்புறம் அஞ்சல்",
  district: "Kanyakumari",
  districtTa: "கன்னியாகுமரி மாவட்டம்",
  diocese: "Kuzhithurai",
  dioceseTa: "குழித்துறை மறைமாவட்டம்",
  vicariate: "Thrittuvapuram",
  vicariateTa: "திரித்துவபுரம் மறைவட்டம்",
  status: "Parish",
  statusTa: "பங்குத்தளம்",
  substation: "St. Mary's Church, Mannanvilai",
  substationTa: "தூய மரியன்னை ஆலயம், மண்ணான்விளை",
  families: 284,
  anbiyams: 10,
  sundayMass: "09:15 AM",
  sundayMassTa: "காலை 09:15 மணி",
  weekdayMass: "07:00 AM",
  weekdayMassTa: "காலை 07:00 மணி",
  festival: "5 days around the Feast of Christ the King in November",
  festivalTa: "நவம்பர் மாதம் கிறிஸ்து அரசர் விழாவை ஒட்டிய ஐந்து நாட்கள்",
  route: "Iruthyapuram is located in the Cheruvarakonam area on the Kaliyakkavilai - Kollamcode road.",
  routeTa: "இருதயபுரமானது, களியக்காவிளை - கொல்லங்கோடு சாலையில் செறுவாரக்கோணம் பகுதியில் அமைந்துள்ளது.",
  
  vocations: [
    "Rev. Fr. Shelly Rose",
    "Rev. Fr. Yesuraj"
  ],
  vocationsTa: [
    "அருட்பணி. ஷெல்லி ரோஸ்",
    "அருட்பணி. ஏசுராஜ்"
  ],
  
  grotto: "St. Mary's Assumption Grotto",
  grottoTa: "புனித விண்ணேற்பு அன்னை குருசடி",
  school: "Christ the King High School",
  schoolTa: "கிறிஸ்து அரசர் உயர்நிலைப் பள்ளி",
  
  associations: [
    { name: "Balasabai (Holy Childhood Association)", nameTa: "பாலர் சபை" },
    { name: "Siruvazhi Iyakkam (Little Way Association)", nameTa: "சிறுவழி இயக்கம்" },
    { name: "YCS (Young Christian Students)", nameTa: "இளம் கிறிஸ்தவ மாணவர் இயக்கம்" },
    { name: "Youth Movement", nameTa: "இளைஞர் இயக்கம்" },
    { name: "Village Development Association", nameTa: "கிராம முன்னேற்ற சங்கம்" },
    { name: "Christian Workers Movement", nameTa: "கிறிஸ்தவ தொழிலாளர் இயக்கம்" },
    { name: "Kolping Movement", nameTa: "கோல்பிங் இயக்கம்" },
    { name: "Liturgical Committee", nameTa: "வழிபாட்டுக் குழு" },
    { name: "Choir", nameTa: "பாடகற்குழு" },
    { name: "Altar Servers", nameTa: "பீடச்சிறார்" },
    { name: "Catechism (Sunday School)", nameTa: "மறைக்கல்வி" },
    { name: "Parish Pastoral Council", nameTa: "பங்கு அருட்பணி பேரவை" },
    { name: "Vincent de paul Society", nameTa: "வின்சென்ட் தே பவுல் சபை"}
  ],
  
  timeline: [
    {
      year: "1945",
      event: "First Thatched Church & Substation Established",
      eventTa: "கிளைப்பங்கு மற்றும் முதல் ஓலைக்குடிசை ஆலயம்",
      description: "Functioned as a substation of Siluvaipuram parish. Under the leadership of Rev. Fr. Porgio, a church was started in a thatched hut with about 25 families.",
      descriptionTa: "சிலுவைபுரம் பங்கின் கிளைப்பங்காக செயல்பட்டு வந்த இருதயபுரம் ஊரில், பங்குத்தந்தை அருட்பணி. போர்ஜியோ தலைமையில் சுமார் 25 குடும்பங்களைக் கொண்டு ஒரு ஓலைக் குடிசையில் ஆலயம் ஆரம்பிக்கப்பட்டது."
    },
    {
      year: "1947",
      event: "Tiled Church Dedication & School Operations",
      eventTa: "ஓட்டுக்கட்டிடம் அமைத்தல் மற்றும் ஆரம்பப்பள்ளி",
      description: "A tiled building was constructed and dedicated to Christ the King. Sunday services were held regularly, and the building functioned as a primary school on weekdays.",
      descriptionTa: "ஓட்டுக் கட்டிடம் அமைக்கப் பட்டு, கிறிஸ்து அரசருக்கு அர்ப்பணிக்கப் பட்டு, ஞாயிறு வழிபாடு நடத்தப்பட்டு வந்தது. மற்ற நாட்களில் ஆரம்பப் பள்ளியாகவும் இயங்கி வந்தது."
    },
    {
      year: "1947 - 1956",
      event: "Spiritual Growth & Congregation Expansion",
      eventTa: "ஆன்மீக வளர்ச்சி மற்றும் விரிவாக்கம்",
      description: "Through the dedicated spiritual service of Rev. Fathers Joseph, Anthony Muthu, Stanislaus, Mellard, Yesudhas, and Bishop Leon A. Dharmaraj, 60 more families joined the fold.",
      descriptionTa: "அருட்பணியாளர்கள் ஜோசப், அந்தோணி முத்து, தனிஸ்லாஸ், மெல்லார்டு, ஏசுதாஸ், லியோன் அ. தர்மராஜ் ஆண்டகை ஆகியோரின் இறைப் பணியால் மேலும் 60 குடும்பங்கள் கிறிஸ்துவில் இணைந்தனர்."
    },
    {
      year: "1956",
      event: "School Upgraded to Middle School",
      eventTa: "நடுநிலைப்பள்ளியாக தரம் உயர்வு",
      description: "The primary school operating at the church premises was officially upgraded to a Middle School, enhancing educational opportunities.",
      descriptionTa: "ஆரம்பப் பள்ளியாக செயல்பட்டு வந்த பள்ளிக்கூடம், 1956 ஆம் ஆண்டு நடுநிலைப் பள்ளியாக உயர்த்தப் பட்டது."
    },
    {
      year: "1975",
      event: "Construction of the Church",
      eventTa: "புதிய ஆலயம் அர்ச்சிப்பு",
      description: "Through the tireless efforts of Rev. Fr. Yesudhas Thomas and Rev. Fr. Ambrose, a new church building was constructed and blessed on March 12, 1975.",
      descriptionTa: "அருட்பணி. ஏசுதாஸ் தோமஸ், அருட்பணி. அம்புரோஸ் ஆகியோரின் முயற்சியால் புதிய ஆலயம் கட்டப்பட்டு 12.03.1975 அன்று அர்ச்சிக்கப் பட்டது."
    },
    {
      year: "1980",
      event: "Affiliation Shift to Kaliyakkavilai",
      eventTa: "களியக்காவிளை கிளைப்பங்காக மாற்றம்",
      description: "Iruthyapuram was transferred to function as a substation of Kaliyakkavilai parish instead of Siluvaipuram.",
      descriptionTa: "1980 ஆம் ஆண்டு முதல் களியக்காவிளை பங்கின் கிளைப் பங்காக இருதயபுரம் மாற்றப்பட்டது."
    },
    {
      year: "1980s",
      event: "High School Status & Infrastructure Expansion",
      eventTa: "உயர்நிலைப்பள்ளியாக தரம் உயர்வு மற்றும் புதிய கட்டடம்",
      description: "Through the efforts of Rev. Fr. Vincent and Rev. Fr. Jones, the school was upgraded to a High School. In 1983, a double-story building was built for it under Rev. Fr. Julius and Rev. Fr. Anthony Alcander.",
      descriptionTa: "அருட்பணி. வின்சென்ட் மற்றும் அருட்பணி. ஜோண்ஸ் ஆகியோரின் முயற்சியால் நடுநிலைப்பள்ளி, உயர்நிலைப் பள்ளியாக தரம் உயர்த்தப் பட்டது. 1983 ஆம் ஆண்டு அருட்பணி. ஜூலியஸ் மற்றும் அருட்பணி. ஆன்றனி அல்காந்தர் ஆகியோரின் முயற்சியால், உயர்நிலைப் பள்ளிக்கு இரண்டு அடுக்கு கட்டிடம் கட்டப்பட்டது."
    },
    {
      year: "2002",
      event: "Erection of Independent Parish",
      eventTa: "தனிப்பங்காக உயர்த்தப்படல்",
      description: "With the guidance and support of Bishop Leon A. Dharmaraj, Iruthyapuram was erected as an independent parish on June 3, 2002. Rev. Fr. Sujan Kumar took charge as the first parish priest.",
      descriptionTa: "மேதகு ஆயர் லியோன் அ. தர்மராஜ் அவர்களின் பேருதவியால் 03.06.2002 அன்று இருதயபுரமானது தனிப்பங்காக உயர்த்தப்பட்டு, முதல் பங்குத்தந்தையாக அருட்பணி. சுஜன் குமார் அவர்கள் பொறுப்பேற்று சிறப்பாக வழி நடத்தினார்."
    },
    {
      year: "2009",
      event: "Blessing of the Grand New Church",
      eventTa: "புதிய பேராலயம் அர்ச்சிப்பு",
      description: "During the tenure of Rev. Fr. R. Paul Richard Joseph, with the cooperation of the parish community, the current grand new church building was constructed and blessed on November 22, 2009, by Bishop Peter Remigius.",
      descriptionTa: "அருட்பணி. R. பால் ரிச்சர்ட் ஜோசப் அவர்களின் பணிக்காலத்தில் பங்கு மக்களின் ஒத்துழைப்புடன் தற்போதைய புதிய ஆலயம் கட்டப்பட்டு, 22.11.2009 அன்று மேதகு ஆயர் பீட்டர் ரெமிஜியுஸ் அவர்களால் அர்ச்சிக்கப் பட்டது."
    }
  ]
};
