const TRANSLATIONS = {
  en: {
    // Header & Nav
    appName: "Agri Labour Connect",
    tagline: "Connecting Farmers with Skilled Agricultural Workers",
    navHome: "Home",
    navFindLabour: "Find Workers",
    navJobs: "Agri Jobs",
    navWageGuide: "Wage Guide",
    navAvailability: "Availability",
    navEmergency: "🚨 Emergency Labour",
    btnFarmer: "👨‍🌾 I am a Farmer",
    btnLabourer: "👷 I am a Labourer",
    btnPostJob: "+ Post a Job",
    btnRegisterWorker: "+ Register as Worker",
    langToggle: "తెలుగు",

    // Hero Section
    heroTitle: "Hire Skilled Agricultural Labour for Your Farm",
    heroSubtitle: "Directly connect with nearby verified workers for harvesting, planting, spraying, weeding & more in Andhra Pradesh & Telangana.",
    statsWorkers: "2,450+ Active Workers",
    statsFarmers: "1,800+ Farmers Connected",
    statsVillages: "320+ Villages Covered",

    // Search Card
    searchHeading: "Find Agricultural Workers Nearby",
    labelDistrict: "Select District",
    labelMandal: "Select Mandal",
    labelVillage: "Select Village / Area",
    labelWorkType: "Work Required",
    labelWorkerCount: "No. of Workers",
    labelDate: "Work Date",
    btnSearchWorkers: "🔍 Search Available Workers",
    btnClearFilter: "Reset Filters",

    // Work Types
    workAll: "All Work Types",
    workHarvesting: "🌾 Harvesting (కోత)",
    workPlanting: "🌱 Planting / Transplantation (నాట్లు)",
    workSpraying: "🧪 Spraying / Fertilizers (మందులు చల్లడం)",
    workWeeding: "🌿 Weeding (కలుపు తీయడం)",
    workTractor: "🚜 Tractor / Machine Operator (ట్రాక్టర్ నడపడం)",
    workPlucking: "🌶️ Plucking (Chilli/Cotton) (ఏరడం)",
    workLoading: "📦 Loading & Transport (రవాణా / మోత)",

    // Emergency Section
    emergencyBadge: "URGENT DISPATCH",
    emergencyTitle: "Workers Cancelled at the Last Minute? Request Emergency Labour!",
    emergencyDesc: "Get instant replacement worker teams within 1-2 hours for critical harvest days or rain threats.",
    btnEmergencySos: "🚨 Request Emergency Replacement Labour",
    sosHelpline: "24/7 Helpline: 1800-425-AGRI (Free)",

    // Worker Directory
    workersHeading: "Available Agricultural Workers & Groups",
    workersSubheading: "Verified local labour with skills, transparent daily wage rates & real farmer reviews.",
    filterAll: "All Workers",
    filterAvailableToday: "✅ Available Today",
    filterIndividual: "Single Worker",
    filterGroup: "Labour Group / Gang (5-20)",
    sortBy: "Sort by:",
    sortRating: "Highest Rated ⭐",
    sortWageLow: "Wage: Low to High",
    sortWageHigh: "Wage: High to Low",
    noWorkersFound: "No workers match your search filters. Try selecting another Mandal or Work Type.",

    // Worker Card
    badgeGroup: "👥 Group (Gang)",
    badgeSolo: "👤 Individual",
    badgeVerified: "Verified",
    labelSkills: "Skills:",
    labelWage: "Daily Wage:",
    labelExperience: "Experience:",
    labelAvailStatus: "Status:",
    statusAvailable: "Available Today",
    statusBooked: "Booked This Week",
    statusBusy: "Busy Today",
    btnCall: "📞 Call",
    btnWhatsapp: "💬 WhatsApp",
    btnBook: "Book Worker",
    btnViewProfile: "View Details",

    // Job Board
    jobsHeading: "Farmer Job Openings (కూలీల అవసరాలు)",
    jobsSubheading: "Farmers looking for workers right now. Labourers can contact farmers directly.",
    filterJobCrop: "All Crops",
    labelNeededWorkers: "Workers Needed:",
    labelOfferedWage: "Offered Wage:",
    labelJobDate: "Required Date:",
    labelFarmerName: "Posted by Farmer:",
    btnApplyJob: "💬 Apply via WhatsApp",
    btnCallFarmer: "📞 Call Farmer",

    // Wage Benchmark Card
    wageHeading: "Transparent Daily Wage Reference Guide",
    wageSubheading: "Standard fair daily wage benchmark per day (8 hours) in Andhra Pradesh & Telangana.",
    colWorkType: "Agricultural Operation",
    colCrop: "Primary Crops",
    colAvgWage: "Standard Daily Wage (₹)",
    colHours: "Typical Hours",
    colPerAcre: "Per Acre Contract Rate",
    calcTitle: "🌾 Farm Labour Cost Estimator",
    calcDesc: "Calculate estimated labor expenditure for your farm:",
    calcWorkersCount: "Number of Labourers:",
    calcDaysCount: "Number of Days:",
    calcSelectWork: "Select Operation:",
    calcTotalEstimate: "Estimated Labour Cost:",

    // Availability Calendar Section
    calendarHeading: "Labour Availability Tracker",
    calendarSubheading: "Check seasonal worker availability across mandals for upcoming harvest windows.",
    calToday: "Today",
    calTomorrow: "Tomorrow",
    calThisWeek: "This Week",
    calHighDemand: "High Demand (Book Early)",
    calModerate: "Good Availability",

    // Reviews & Testimonials
    reviewsHeading: "Farmer & Worker Testimonials",
    reviewsSubheading: "Real experiences from agricultural communities using Agri Labour Connect.",
    btnWriteReview: "⭐ Leave a Rating & Review",

    // Modals
    modalFarmerTitle: "👨‍🌾 Farmer Registration",
    modalFarmerDesc: "Register your farm to post jobs and book agricultural labourers quickly.",
    modalLabourTitle: "👷 Agricultural Labourer Registration",
    modalLabourDesc: "Create your worker profile to receive daily work calls and WhatsApp bookings.",
    modalPostJobTitle: "🌾 Post an Agricultural Job Opening",
    modalSosTitle: "🚨 Emergency Labour SOS Request",
    modalReviewTitle: "⭐ Submit Worker / Farmer Review",

    // Form Fields
    formName: "Full Name",
    formPhone: "Mobile Number (WhatsApp)",
    formDistrict: "District",
    formMandal: "Mandal",
    formVillage: "Village Name",
    formCrops: "Crops Cultivated (e.g., Paddy, Chilli, Cotton, Maize)",
    formFarmSize: "Farm Size (in Acres)",
    formSkills: "Select Skills / Work Types",
    formWorkerType: "Worker Type",
    formGroupSize: "Number of Members (if Group)",
    formDailyWage: "Expected Daily Wage (₹)",
    formExperience: "Years of Farm Work Experience",
    formAvailDays: "Availability Status",
    formJobTitle: "Job Title (e.g., Paddy Harvest Crew Needed)",
    formWorkType: "Type of Farm Work",
    formWorkersCount: "Number of Workers Needed",
    formWorkDate: "Starting Work Date",
    formOfferedWage: "Offered Daily Wage (₹ per worker)",
    formFoodProvided: "Food / Transportation Provided?",
    formJobDetails: "Additional Details / Farm Location Landmark",
    formSosReason: "Emergency Reason (e.g. Rain expected, Previous workers did not show up)",
    formSosUrgency: "Required within",
    formRatingScore: "Rating Score (1-5 Stars)",
    formReviewComments: "Feedback / Work Experience",

    // Options
    optYes: "Yes, Provided",
    optNo: "No, Self Arranged",
    optUrgent1hr: "Within 2 Hours (Super Urgent)",
    optUrgentToday: "Today Morning / Afternoon",
    optUrgentTomorrow: "Tomorrow Morning (6:00 AM)",

    // Buttons
    btnSubmit: "Submit & Save",
    btnCancel: "Cancel",
    btnSendSos: "🚨 Dispatch Emergency Request",

    // Footer
    footerAbout: "Agri Labour Connect empowers farmers and rural workers with direct, transparent, and fair agricultural job connections with zero middleman commissions.",
    footerLinks: "Quick Navigation",
    footerDistricts: "Active Districts in AP & TG",
    footerHelpline: "Kisan & Labour Helpline",
    footerCopy: "© 2026 Agri Labour Connect. Built with ❤️ for Indian Agriculture & Farming Communities.",

    // Notifications
    toastWorkerAdded: "🎉 Labourer profile registered successfully!",
    toastJobPosted: "🌾 Job opening published successfully!",
    toastSosSent: "🚨 Emergency Labour Alert broadcasted to nearby groups!",
    toastReviewAdded: "⭐ Thank you! Your review has been submitted.",
    toastBookSuccess: "📋 Booking request initiated! Connecting via WhatsApp..."
  },

  te: {
    // Header & Nav
    appName: "అగ్రి లేబర్ కనెక్ట్",
    tagline: "రైతులను నైపుణ్యం కలిగిన వ్యవసాయ కూలీలతో అనుసంధానించడం",
    navHome: "హోమ్",
    navFindLabour: "కూలీల శోధన",
    navJobs: "కూలీల అవసరాలు",
    navWageGuide: "కూలి రేట్ల వివరాలు",
    navAvailability: "లభ్యత క్యాలెండర్",
    navEmergency: "🚨 అత్యవసర కూలీలు",
    btnFarmer: "👨‍🌾 నేను రైతును",
    btnLabourer: "👷 నేను కూలీని",
    btnPostJob: "+ పనిని పోస్ట్ చేయండి",
    btnRegisterWorker: "+ కూలీగా నమోదు చేసుకోండి",
    langToggle: "English",

    // Hero Section
    heroTitle: "మీ పొలం పనులకు నైపుణ్యం కలిగిన వ్యవసాయ కూలీలను పొందండి",
    heroSubtitle: "వరి కోతలు, నాట్లు, మందుల పిచికారీ, కలుపు తీయడం మరియు ట్రాక్టర్ పనుల కోసం మీ గ్రామ సమీప కూలీలను నేరుగా సంప్రదించండి.",
    statsWorkers: "2,450+ నమోదైన కూలీలు",
    statsFarmers: "1,800+ అనుసంధానమైన రైతులు",
    statsVillages: "320+ గ్రామాలు",

    // Search Card
    searchHeading: "సమీపంలోని వ్యవసాయ కూలీలను వెతకండి",
    labelDistrict: "జిల్లాను ఎంచుకోండి",
    labelMandal: "మండలాన్ని ఎంచుకోండి",
    labelVillage: "గ్రామం / ప్రాంతం",
    labelWorkType: "కావలసిన పని రకం",
    labelWorkerCount: "కూలీల సంఖ్య",
    labelDate: "పని తేదీ",
    btnSearchWorkers: "🔍 కూలీల కోసం వెతకండి",
    btnClearFilter: "ఫిల్టర్లు క్లియర్ చేయండి",

    // Work Types
    workAll: "అన్ని రకాల పనులు",
    workHarvesting: "🌾 పంట కోత (Harvesting)",
    workPlanting: "🌱 నాట్లు వేయడం (Planting)",
    workSpraying: "🧪 మందులు పిచికారీ (Spraying)",
    workWeeding: "🌿 కలుపు తీత (Weeding)",
    workTractor: "🚜 ట్రాక్టర్ / మిషన్ ఆపరేటర్ (Tractor)",
    workPlucking: "🌶️ మిర్చి / పత్తి ఏరడం (Plucking)",
    workLoading: "📦 బస్తాలు మోత & రవాణా (Loading)",

    // Emergency Section
    emergencyBadge: "అత్యవసర విభాగం",
    emergencyTitle: "కూలీలు చివరి నిమిషంలో రాలేదా? తక్షణ అత్యవసర కూలీలను పొందండి!",
    emergencyDesc: "వర్షం భయం లేదా కోత అత్యవసర సమయాల్లో 1-2 గంటల్లో ప్రత్యామ్నాయ కూలీ బృందాలను పొందండి.",
    btnEmergencySos: "🚨 తక్షణ ప్రత్యామ్నాయ కూలీల కోసం అభ్యర్థించండి",
    sosHelpline: "24/7 ఉచిత హెల్ప్‌లైన్: 1800-425-AGRI",

    // Worker Directory
    workersHeading: "అందుబాటులో ఉన్న వ్యవసాయ కూలీలు & బృందాలు",
    workersSubheading: "ధృవీకరించబడిన గ్రామ కూలీలు, పారదర్శక రోజువారీ కూలి రేట్లు మరియు రైతుల నిజమైన రివ్యూలు.",
    filterAll: "అందరు కూలీలు",
    filterAvailableToday: "✅ ఈరోజు అందుబాటులో ఉన్నారు",
    filterIndividual: "వ్యక్తిగత కూలీ",
    filterGroup: "కూలీ బృందం / ముఠా (5-20 మంది)",
    sortBy: "క్రమబద్ధీకరించు:",
    sortRating: "అత్యధిక రేటింగ్ ⭐",
    sortWageLow: "కూలి: తక్కువ నుండి ఎక్కువ",
    sortWageHigh: "కూలి: ఎక్కువ నుండి తక్కువ",
    noWorkersFound: "మీరు ఎంచుకున్న వివరాలకు కూలీలు లభించలేదు. దయచేసి వేరే మండలం లేదా పని రకాన్ని ఎంచుకోండి.",

    // Worker Card
    badgeGroup: "👥 కూలీ బృందం (ముఠా)",
    badgeSolo: "👤 వ్యక్తిగత కూలీ",
    badgeVerified: "ధృవీకరించబడినది",
    labelSkills: "నైపుణ్యాలు:",
    labelWage: "రోజువారీ కూలి:",
    labelExperience: "అనుభవం:",
    labelAvailStatus: "స్థితి:",
    statusAvailable: "ఈరోజు ఖాళీగా ఉన్నారు",
    statusBooked: "ఈ వారం బుక్ అయ్యారు",
    statusBusy: "ఈరోజు పనిలో ఉన్నారు",
    btnCall: "📞 ఫోన్ చేయండి",
    btnWhatsapp: "💬 వాట్సాప్",
    btnBook: "బుక్ చేసుకోండి",
    btnViewProfile: "వివరాలు చూడండి",

    // Job Board
    jobsHeading: "రైతుల వద్ద ఉన్న పనులు (Agri Job Openings)",
    jobsSubheading: "కూలీలు కావాల్సిన రైతుల ప్రకటనలు. కూలీలు నేరుగా రైతుకు ఫోన్ లేదా వాట్సాప్ చేయవచ్చు.",
    filterJobCrop: "అన్ని పంటలు",
    labelNeededWorkers: "కావలసిన కూలీలు:",
    labelOfferedWage: "చెల్లించే కూలి:",
    labelJobDate: "పని తేదీ:",
    labelFarmerName: "రైతు పేరు:",
    btnApplyJob: "💬 వాట్సాప్‌లో సంప్రదించండి",
    btnCallFarmer: "📞 రైతుకు ఫోన్ చేయండి",

    // Wage Benchmark Card
    wageHeading: "ప్రామాణిక రోజువారీ కూలి రేట్ల మార్గదర్శి",
    wageSubheading: "ఆంధ్రప్రదేశ్ & తెలంగాణలో వివిధ వ్యవసాయ పనులకు రోజువారీ (8 గంటల) న్యాయమైన కూలి రేట్లు.",
    colWorkType: "వ్యవసాయ పని రకం",
    colCrop: "పంటలు",
    colAvgWage: "ప్రామాణిక రోజు కూలి (₹)",
    colHours: "పని సమయం",
    colPerAcre: "ఎకరా గుత్త రేటు (సుమారు)",
    calcTitle: "🌾 పొలం కూలి ఖర్చుల గణన యంత్రం",
    calcDesc: "మీ పొలం పనికి అయ్యే సుమారు కూలీ ఖర్చును లెక్కించండి:",
    calcWorkersCount: "కావలసిన కూలీల సంఖ్య:",
    calcDaysCount: "పని రోజుల సంఖ్య:",
    calcSelectWork: "పని రకాన్ని ఎంచుకోండి:",
    calcTotalEstimate: "మొత్తం అంచనా వ్యయం:",

    // Availability Calendar Section
    calendarHeading: "కూలీల లభ్యత క్యాలెండర్",
    calendarSubheading: "మండలాల వారీగా రాబోయే రోజుల్లో కూలీల లభ్యతను తనిఖీ చేసి ముందస్తుగా బుక్ చేసుకోండి.",
    calToday: "ఈరోజు",
    calTomorrow: "రేపు",
    calThisWeek: "ఈ వారం",
    calHighDemand: "ఎక్కువ డిమాండ్ ఉంది (ముందే బుక్ చేసుకోండి)",
    calModerate: "కూలీలు అందుబాటులో ఉన్నారు",

    // Reviews & Testimonials
    reviewsHeading: "రైతులు మరియు కూలీల అభిప్రాయాలు (Reviews)",
    reviewsSubheading: "అగ్రి లేబర్ కనెక్ట్ ద్వారా లాభం పొందిన రైతుల నిజమైన అనుభవాలు.",
    btnWriteReview: "⭐ రేటింగ్ & రివ్యూ ఇవ్వండి",

    // Modals
    modalFarmerTitle: "👨‍🌾 రైతు నమోదు (Farmer Registration)",
    modalFarmerDesc: "కూలీల అవసరాలను పోస్ట్ చేయడానికి మరియు కూలీలను బుక్ చేసుకోవడానికి మీ వివరాలను నమోదు చేయండి.",
    modalLabourTitle: "👷 వ్యవసాయ కూలీ నమోదు (Labour Registration)",
    modalLabourDesc: "రోజువారీ పనులు మరియు వాట్సాప్ బుకింగ్స్ పొందడానికి మీ నైపుణ్యాలను నమోదు చేయండి.",
    modalPostJobTitle: "🌾 వ్యవసాయ పనిని పోస్ట్ చేయండి",
    modalSosTitle: "🚨 తక్షణ అత్యవసర కూలీల అభ్యర్థన",
    modalReviewTitle: "⭐ కూలీ / రైతు రివ్యూ రాయండి",

    // Form Fields
    formName: "పూర్తి పేరు",
    formPhone: "మొబైల్ నంబర్ (వాట్సాప్ ఉన్నది)",
    formDistrict: "జిల్లా",
    formMandal: "మండలం",
    formVillage: "గ్రామం పేరు",
    formCrops: "సాగు చేసే పంటలు (వరి, మిర్చి, పత్తి మొదలైనవి)",
    formFarmSize: "పొలం విస్తీర్ణం (ఎకరాల్లో)",
    formSkills: "నైపుణ్యాలు / చేసే పనులు ఎంచుకోండి",
    formWorkerType: "కూలీ రకం",
    formGroupSize: "ముఠా సభ్యుల సంఖ్య (బృందం అయితే)",
    formDailyWage: "రోజూ ఆశించే కూలి (₹)",
    formExperience: "పని అనుభవం (సంవత్సరాల్లో)",
    formAvailDays: "లభ్యత స్థితి",
    formJobTitle: "పని శీర్షిక (ఉదా: వరి కోతకు కూలీలు కావాలి)",
    formWorkType: "పని రకం",
    formWorkersCount: "కావలసిన కూలీల సంఖ్య",
    formWorkDate: "పని ప్రారంభ తేదీ",
    formOfferedWage: "చెల్లించే రోజు కూలి (ఒక్కరికి ₹)",
    formFoodProvided: "భోజనం / రవాణా సదుపాయం ఉందా?",
    formJobDetails: "పొలం చిరునామా / ఇతర వివరాలు",
    formSosReason: "అత్యవసర కారణం (వర్షం ముప్పు, ముందు మాట్లాడిన కూలీలు రాలేదు)",
    formSosUrgency: "ఎంత సమయంలో కావాలి?",
    formRatingScore: "రేటింగ్ (1 నుండి 5 నక్షత్రాలు)",
    formReviewComments: "మీ అనుభవం / వ్యాఖ్యలు",

    // Options
    optYes: "అవును, కల్పిస్తాము",
    optNo: "లేదు, వారిదే ఏర్పాటు",
    optUrgent1hr: "2 గంటల్లోగా (చాలా అత్యవసరం)",
    optUrgentToday: "ఈరోజు మధ్యాహ్నం / సాయంత్రం లోపు",
    optUrgentTomorrow: "రేపు ఉదయం (6:00 గంటలకు)",

    // Buttons
    btnSubmit: "నమోదు చేసి సేవ్ చేయండి",
    btnCancel: "రద్దు చేయండి",
    btnSendSos: "🚨 అత్యవసర అభ్యర్థనను పంపండి",

    // Footer
    footerAbout: "అగ్రి లేబర్ కనెక్ట్ రైతులను మరియు గ్రామీణ శ్రామికులను మధ్యవర్తులు లేకుండా నేరుగా మరియు పారదర్శకంగా అనుసంధానిస్తుంది.",
    footerLinks: "ముఖ్యమైన లింకులు",
    footerDistricts: "సేవలు అందించే జిల్లాలు",
    footerHelpline: "రైతు & కూలీల సహాయ కేంద్రం",
    footerCopy: "© 2026 అగ్రి లేబర్ కనెక్ట్. భారతీయ రైతు మరియు శ్రామిక లోకం కోసం ప్రేమతో నిర్మించబడింది.",

    // Notifications
    toastWorkerAdded: "🎉 కూలీ ప్రొఫైల్ విజయవంతంగా నమోదైంది!",
    toastJobPosted: "🌾 పని ప్రకటన విజయవంతంగా పోస్ట్ చేయబడింది!",
    toastSosSent: "🚨 సమీప కూలీ ముఠాలకు అత్యవసర సందేశం పంపబడింది!",
    toastReviewAdded: "⭐ ధన్యవాదాలు! మీ రివ్యూ నమోదైంది.",
    toastBookSuccess: "📋 బుకింగ్ ప్రారంభించబడింది! వాట్సాప్ ద్వారా కలుపుతున్నాము..."
  }
};
