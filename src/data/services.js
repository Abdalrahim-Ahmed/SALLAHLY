export const FEES = { transport: 25, inspection: 40, currency: 'جنيه مصري' };

// Used when a service image path is missing or fails to load
export const FALLBACK_SERVICE_IMAGE = '/images/services/photos/appliances.jpg';

// Swap to the fallback once (prevents an onError loop if the fallback is missing too)
export const handleImageError = (e) => {
  const img = e.currentTarget;
  img.onerror = null;
  if (!img.src.endsWith(FALLBACK_SERVICE_IMAGE)) img.src = FALLBACK_SERVICE_IMAGE;
};

export const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'ac', label: 'تكييف' },
  { id: 'electric', label: 'كهرباء' },
  { id: 'plumbing', label: 'سباكة' },
  { id: 'maintenance', label: 'أجهزة كهربائية' },
];

// Service image & icon mappings for the 4 core services
export const services = [
  {
    id: 'ac-maintenance',
    title: 'صيانة وتنظيف تكييف',
    category: 'ac',
    icon: '/images/services/icons/conditioner-icon.png',
    image: '/images/services/photos/ac-maintenance.jpg',
    price: 120,
    duration: 'ساعة تقريباً',
    short: 'تنظيف الفلاتر، شحن الفريون، وفحص عام',
    description:
      'غسيل الوحدة الداخلية والخارجية، فحص الضغط وشحن الفريون عند الحاجة، لتبريد أقوى واستهلاك أقل للكهرباء.',
    features: ['غسيل الفلاتر والملفات', 'فحص وشحن الفريون', 'فحص عام للوحدة', 'ضمان 30 يوم'],
    problems: ['ضعف التبريد', 'رائحة كريهة من التكييف', 'تنقيط مياه من الوحدة الداخلية', 'صوت عالٍ أثناء التشغيل'],
    related: ['electrical', 'plumbing'],
  },
  {
    id: 'electrical',
    title: 'كهرباء وإصلاح أعطال',
    category: 'electric',
    icon: '/images/services/icons/electric-icon.png',
    image: '/images/services/photos/electrical.jpg',
    price: 150,
    duration: 'من ساعة إلى 3 ساعات',
    short: 'تركيب الإنارة وإصلاح التمديدات والأعطال الكهربائية',
    description:
      'فحص التمديدات واللوحة الكهربائية وتحديد الأحمال، تركيب وصيانة الإنارة واستبدال المفاتيح والأفياش التالفة.',
    features: ['فحص اللوحة والأحمال', 'تركيب كل أنواع الإنارة', 'استبدال المفاتيح والأفياش', 'ضمان 30 يوم'],
    problems: ['فصل متكرر للقاطع', 'لمبات تنطفئ أو تومض', 'مفتاح أو فيشة لا تعمل', 'سخونة في الأسلاك'],
    related: ['ac-maintenance', 'general-maintenance'],
  },
  {
    id: 'plumbing',
    title: 'سباكة وتسليك مجاري',
    category: 'plumbing',
    icon: '/images/services/icons/plumbing-icon.png',
    image: '/images/services/photos/plumbing.jpg',
    price: 110,
    duration: 'من ساعة إلى ساعتين',
    short: 'تسليك المجاري وإصلاح الخلاطات والتسريبات',
    description:
      'تسليك الانسدادات بأجهزة ضغط، وإصلاح أو استبدال الخلاطات والسيفونات والمراحيض، وكشف وإصلاح تسريبات المياه.',
    features: ['تسليك بأجهزة الضغط', 'إصلاح واستبدال الخلاطات', 'كشف التسريبات بأجهزة حديثة', 'ضمان 30 يوم'],
    problems: ['بطء تصريف المياه', 'انسداد المجاري', 'تسريب تحت المغسلة', 'خلاط يقطر'],
    related: ['ac-maintenance', 'general-maintenance'],
  },
  {
    id: 'general-maintenance',
    title: 'صيانة أجهزة كهربائية',
    category: 'maintenance',
    icon: '/images/services/icons/maintenance-icon.png',
    image: '/images/services/photos/appliances.jpg',
    price: 100,
    duration: 'من ساعة إلى ساعتين',
    short: 'تشخيص وإصلاح أعطال الأجهزة الكهربائية المنزلية',
    description:
      'فحص وإصلاح أعطال الأجهزة الكهربائية المنزلية، مع توفير قطع الغيار عند الحاجة وضمان على الخدمة.',
    features: ['تشخيص العطل في الموقع', 'إصلاح الأجهزة الكهربائية المنزلية', 'قطع غيار عند الحاجة', 'ضمان 30 يوم'],
    problems: ['الغسالة لا تعمل', 'الثلاجة لا تبرد', 'أعطال الأجهزة الكهربائية المنزلية', 'أصوات أو تسريب غير معتاد من الجهاز'],
    related: ['electrical', 'plumbing'],
  },
];

export const getServiceById = (id) => services.find((s) => s.id === id);
