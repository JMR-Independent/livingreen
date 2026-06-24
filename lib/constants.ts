export const COMPANY_INFO = {
  name: 'LivinGreen',
  tagline: 'Upholstery, Couch & Fabric Protection Specialists',
  url: 'https://livingreen.life',
  phone: '+13854825694',
  phoneDisplay: '+1 (385) 482-5694',
  whatsapp: '13854825694',
  email: 'info@livingreen.com',
  rating: { value: 5.0, count: 7 },
  address: {
    street: '123 Main Street',
    city: 'Santaquin',
    state: 'Utah',
    stateCode: 'UT',
    zip: '84655',
    full: '123 Main Street, Santaquin, UT 84655'
  },
  serviceArea: 'Serving Utah County & Salt Lake County — from Santaquin to Salt Lake City',
  cities: ['Santaquin', 'Spanish Fork', 'Provo', 'Orem', 'Lehi', 'Salt Lake City'],
  hours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Sat: 9:00 AM - 6:00 PM',
    sunday: 'Sun: Closed'
  },
  social: {
    facebook: 'https://www.facebook.com/Livingreen?locale=es_LA',
    instagram: 'https://www.instagram.com/livingreen_life/',
    linkedin: 'https://linkedin.com/company/livingreenutah',
  }
};

// All service-area cities (Utah County + Salt Lake County) — powers the /locations SEO pages.
export interface City {
  name: string;
  slug: string;
  county: 'Utah County' | 'Salt Lake County';
}

export const CITIES: City[] = [
  // Utah County — from Santaquin north
  { name: 'Santaquin', slug: 'santaquin', county: 'Utah County' },
  { name: 'Genola', slug: 'genola', county: 'Utah County' },
  { name: 'Payson', slug: 'payson', county: 'Utah County' },
  { name: 'Salem', slug: 'salem', county: 'Utah County' },
  { name: 'Spanish Fork', slug: 'spanish-fork', county: 'Utah County' },
  { name: 'Springville', slug: 'springville', county: 'Utah County' },
  { name: 'Mapleton', slug: 'mapleton', county: 'Utah County' },
  { name: 'Provo', slug: 'provo', county: 'Utah County' },
  { name: 'Orem', slug: 'orem', county: 'Utah County' },
  { name: 'Vineyard', slug: 'vineyard', county: 'Utah County' },
  { name: 'Lindon', slug: 'lindon', county: 'Utah County' },
  { name: 'Pleasant Grove', slug: 'pleasant-grove', county: 'Utah County' },
  { name: 'American Fork', slug: 'american-fork', county: 'Utah County' },
  { name: 'Cedar Hills', slug: 'cedar-hills', county: 'Utah County' },
  { name: 'Highland', slug: 'highland', county: 'Utah County' },
  { name: 'Alpine', slug: 'alpine', county: 'Utah County' },
  { name: 'Lehi', slug: 'lehi', county: 'Utah County' },
  { name: 'Saratoga Springs', slug: 'saratoga-springs', county: 'Utah County' },
  { name: 'Eagle Mountain', slug: 'eagle-mountain', county: 'Utah County' },
  // Salt Lake County — continuing north to Salt Lake City
  { name: 'Bluffdale', slug: 'bluffdale', county: 'Salt Lake County' },
  { name: 'Riverton', slug: 'riverton', county: 'Salt Lake County' },
  { name: 'Herriman', slug: 'herriman', county: 'Salt Lake County' },
  { name: 'South Jordan', slug: 'south-jordan', county: 'Salt Lake County' },
  { name: 'West Jordan', slug: 'west-jordan', county: 'Salt Lake County' },
  { name: 'Draper', slug: 'draper', county: 'Salt Lake County' },
  { name: 'Sandy', slug: 'sandy', county: 'Salt Lake County' },
  { name: 'Midvale', slug: 'midvale', county: 'Salt Lake County' },
  { name: 'Murray', slug: 'murray', county: 'Salt Lake County' },
  { name: 'Taylorsville', slug: 'taylorsville', county: 'Salt Lake County' },
  { name: 'West Valley City', slug: 'west-valley-city', county: 'Salt Lake County' },
  { name: 'Cottonwood Heights', slug: 'cottonwood-heights', county: 'Salt Lake County' },
  { name: 'Holladay', slug: 'holladay', county: 'Salt Lake County' },
  { name: 'Salt Lake City', slug: 'salt-lake-city', county: 'Salt Lake County' },
];

export interface Service {
  id: string;
  title: string;
  slug: string;
  focus?: boolean;
  shortDescription: string;
  description: string;
  keywords: string[];
  image: string;
  features: string[];
  price: string;
}

export const SERVICES: Service[] = [
  {
    id: 'upholstery-cleaning',
    title: 'Upholstery & Couch Cleaning',
    slug: 'upholstery-cleaning',
    focus: true,
    shortDescription: 'Deep cleaning for sofas, couches, sectionals & furniture',
    description: 'Professional upholstery and couch cleaning with deep vacuum, stain removal, hot-water extraction, and steam cleaning. We clean sofas, loveseats, sectionals, armchairs and recliners — fast drying with fans included.',
    keywords: ['upholstery cleaning', 'couch cleaning', 'sofa cleaning', 'sectional cleaning', 'loveseat cleaning', 'recliner cleaning', 'armchair cleaning', 'chaise lounge cleaning', 'ottoman cleaning', 'settee cleaning', 'futon cleaning', 'sleeper sofa cleaning', 'divan cleaning', 'microfiber couch cleaning', 'leather sofa cleaning', 'fabric couch cleaning', 'furniture cleaning', 'pet stain removal upholstery'],
    image: '/images/services/upholstery-cleaning.jpg',
    features: [
      '1-seat sofa: $35',
      '2-seat loveseat: $65',
      '3-seat sofa: $85',
      'Sectionals: from $100',
      'Deep stain & odor removal',
      'Steam cleaning & fast drying'
    ],
    price: 'Starting at $35',
  },
  {
    id: 'protection',
    title: 'Fabric & Stain Protection',
    slug: 'protection',
    focus: true,
    shortDescription: 'Scotchgard-style shield for upholstery & furniture',
    description: 'Professional fabric and stain protection that repels spills, stains and dirt, keeping your couch and furniture looking new and extending its life. Recommended after every upholstery cleaning.',
    keywords: ['fabric protection', 'stain protection', 'scotchgard service', 'upholstery protection', 'couch fabric protector', 'water repellent treatment'],
    image: '/images/services/protection.webp',
    features: [
      'Upholstery/Sofas: Starting at $30',
      'Carpets: Starting at $20',
      'Scotchgard-style protection',
      'Water and stain repellent',
      'UV protection',
      'Extends fabric life'
    ],
    price: 'Starting at $30',
  },
  {
    id: 'chair-cleaning',
    title: 'Chair & Dining Set Cleaning',
    slug: 'chair-cleaning',
    shortDescription: 'Fabric & leather cleaning for dining and office chairs',
    description: 'Specialized cleaning for all types of chairs, from dining room sets to office furniture, restoring comfort and appearance with deep stain and odor removal.',
    keywords: ['chair cleaning', 'dining chair cleaning', 'office chair cleaning', 'recliner cleaning', 'leather chair cleaning'],
    image: '/images/services/chair-cleaning.jpg',
    features: [
      'Chairs: $10 to $20 (depending on size)',
      'All chair types welcome',
      'Fabric and leather cleaning',
      'Stain removal',
      'Odor elimination',
      'Quick drying process'
    ],
    price: '$10-$20/chair',
  },
  {
    id: 'mattress-cleaning',
    title: 'Mattress Cleaning',
    slug: 'mattress-cleaning',
    shortDescription: 'Deep sanitization for healthier sleep',
    description: 'Professional vacuum, steam disinfection, and stain removal per side. Removes dust mites, allergens, sweat and stains. Minimum $90 per visit. Can combine with other services.',
    keywords: ['mattress cleaning', 'mattress sanitizing', 'dust mite removal', 'mattress stain removal'],
    image: '/images/services/mattress-cleaning.jpg',
    features: [
      'Twin (per side): $40',
      'Full/Queen (per side): $50',
      'King (per side): $60',
      'Deep vacuum & steam disinfection',
      'Stain, odor & mite removal',
      'Fast drying guaranteed'
    ],
    price: 'Starting at $40/side',
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    shortDescription: 'Deep steam cleaning for all types of carpets',
    description: 'Deep cleaning for rooms, hallways, stairs, and living areas. Removes dirt, allergens, pet stains and odors. Eco-friendly and fast-drying. Minimum order $90.',
    keywords: ['carpet cleaning', 'steam carpet cleaning', 'carpet stain removal', 'pet stain removal carpet', 'area rug cleaning'],
    image: '/images/services/carpet-cleaning.jpg',
    features: [
      'Rooms: $30 each',
      'Hallways: $10 to $30',
      'Living rooms: $30 to $60',
      'Stairs: $45 to $55',
      'Odor removal: $20 per area',
      'Minimum order: $90'
    ],
    price: 'Starting at $30/room',
  },
  {
    id: 'car-interior',
    title: 'Car Interior & Auto Upholstery Detailing',
    slug: 'car-interior',
    shortDescription: 'Complete interior cleaning and detailing',
    description: 'At-home auto upholstery and interior detailing taking 1-4 hours. We bring all equipment, just need an electrical connection. Basic ($100-$130) or complete ($160-$200) cleaning available.',
    keywords: ['car interior cleaning', 'auto upholstery cleaning', 'car seat cleaning', 'car detailing', 'interior detailing'],
    image: '/images/services/car-interior.jpg',
    features: [
      'Basic cleaning: $100-$130',
      'Complete cleaning: $160-$200',
      'Odor removal: +$35',
      'Engine wash: +$60',
      'At-home service (1-4 hours)',
      'All equipment provided'
    ],
    price: 'Starting at $100',
  },
];

// Every common name people use for upholstered furniture — woven into pages so we
// rank no matter how a customer phrases their search (couch vs sofa vs sectional…).
export const UPHOLSTERY_TYPES = [
  'Couches',
  'Sofas',
  'Sectionals',
  'Loveseats',
  'Recliners',
  'Armchairs',
  'Accent chairs',
  'Chaise lounges',
  'Ottomans',
  'Settees',
  'Futons',
  'Sleeper sofas',
  'Divans',
  'Microfiber couches',
  'Leather sofas',
  'Fabric couches',
  'Dining chairs',
  'Bar stools',
  'Headboards',
  'Mattresses',
];

// Curated REAL photos of couches/sofas/upholstery work only (no carpet, mattress, car, stairs).
// Used across the upholstery-focused pages — original images rank better than stock (SEO).
export const COUCH_IMAGES = [
  '/images/gallery/gallery-3.jpg',
  '/images/gallery/gallery-5.jpg',
  '/images/gallery/gallery-7.jpg',
  '/images/gallery/gallery-10.jpg',
  '/images/gallery/gallery-11.jpg',
  '/images/gallery/gallery-12.jpg',
  '/images/gallery/gallery-13.jpg',
  '/images/gallery/gallery-15.jpg',
  '/images/gallery/gallery-16.jpg',
  '/images/gallery/gallery-18.jpg',
  '/images/gallery/gallery-19.jpg',
  '/images/gallery/gallery-20.jpg',
  '/images/gallery/gallery-21.jpg',
  '/images/gallery/gallery-24.jpg',
  '/images/gallery/gallery-26.jpg',
  '/images/gallery/gallery-28.jpg',
  '/images/gallery/gallery-29.jpg',
  '/images/gallery/gallery-30.jpg',
];

export const FAQS = [
  {
    question: 'How is the cleaning service priced?',
    answer: 'Carpets: $30 per room, $10-30 hallways, $30-60 living rooms, $45-55 stairs. Upholstery: $35-100 depending on size. Mattresses: $40-60 per side. Cars: $100 basic, $160 complete. Minimum order: $90. We provide free estimates for all services.'
  },
  {
    question: 'What should I do before you arrive?',
    answer: 'For carpet and upholstery cleaning, please remove small items and valuables from the area. We can help move light furniture. For car interior cleaning, please remove personal items from your vehicle.'
  },
  {
    question: 'How long does it take to dry?',
    answer: 'Our advanced cleaning system uses 80% less water than traditional methods. Area rugs and upholstery typically dry in 4-6 hours, mattresses in 5-6 hours, and car interiors in 3-4 hours, depending on humidity and temperature.'
  },
  {
    question: 'Do you offer a satisfaction guarantee?',
    answer: 'Yes! We stand behind our work with a 3-day satisfaction guarantee. If you are not completely satisfied with our cleaning service and contact us within those 3 days, we will return to re-clean the area at no additional charge.'
  },
  {
    question: 'Are your cleaning products safe for children and pets?',
    answer: 'Absolutely! We use eco-friendly, non-toxic cleaning solutions that are safe for children, pets, and the environment. All our products meet EPA standards and are certified for residential use.'
  },
  {
    question: 'Can you remove all types of stains?',
    answer: 'We use specialized treatments for different types of stains and achieve excellent results in most cases. However, some stubborn stains like permanent dye, bleach damage, or old set-in stains may not be 100% removable. We will always provide an honest assessment.'
  },
  {
    question: 'Do you service my area?',
    answer: 'We provide services throughout Utah County and Salt Lake County, specifically from Santaquin to Salt Lake City, including Spanish Fork, Provo, Orem, and surrounding areas. Contact us to confirm service in your specific location.'
  },
  {
    question: 'Is the service done at my location?',
    answer: 'Yes! All our services are performed on-site at your home or business. We bring all necessary equipment and will protect your floors during the cleaning process. This ensures your convenience and allows you to see the results immediately.'
  },
  {
    question: 'Do you offer sanitization services?',
    answer: 'Yes, all our cleaning services include sanitization using EPA-registered disinfectants. Our cleaning process eliminates 99.9% of bacteria, viruses, allergens, and dust mites, creating a healthier environment for you and your family.'
  },
  {
    question: 'What makes LivinGreen different?',
    answer: 'We use professional-grade Swiss and German equipment, eco-friendly certified products, and our technicians have 7+ years of experience. We use 80% less water than traditional methods, offer same-day service, provide satisfaction guarantee, and have served thousands of satisfied customers in Utah.'
  },
];

export const REVIEWS = [
  {
    name: 'Sarah Johnson',
    location: 'Provo, UT',
    rating: 5,
    text: 'My carpet looks really good! They showed up on time and did a nice job. The price was fair too.',
    date: '2024-01-15'
  },
  {
    name: 'Michael Chen',
    location: 'Orem, UT',
    rating: 5,
    text: 'Good service. They got most of the pet stains out and were friendly. Would use them again.',
    date: '2024-01-10'
  },
  {
    name: 'Jennifer Martinez',
    location: 'Salt Lake City, UT',
    rating: 5,
    text: 'Happy with the results on my car seats. They worked hard and the price was reasonable.',
    date: '2024-01-05'
  },
  {
    name: 'David Williams',
    location: 'Spanish Fork, UT',
    rating: 5,
    text: 'They cleaned my office carpet. Good work and easy to schedule. Thanks!',
    date: '2023-12-20'
  },
  {
    name: 'Carlos Rodriguez',
    location: 'West Valley City, UT',
    rating: 5,
    text: 'Buen servicio! Mis alfombras quedaron limpias. Muy amable la persona que vino. Precio justo.',
    date: '2024-02-01'
  },
  {
    name: 'Emily Thompson',
    location: 'Sandy, UT',
    rating: 5,
    text: 'My couch looks much better! I have kids so it was pretty stained. Happy with how it turned out.',
    date: '2024-01-28'
  },
  {
    name: 'Miguel Hernandez',
    location: 'Taylorsville, UT',
    rating: 5,
    text: 'Llegaron a tiempo y trabajaron bien. Mis alfombras se ven mejor. Recomendado.',
    date: '2024-01-22'
  },
  {
    name: 'Rebecca Anderson',
    location: 'Lehi, UT',
    rating: 5,
    text: 'Good job on the mattress cleaning. They explained what they were doing which I appreciated.',
    date: '2024-01-18'
  },
  {
    name: 'Juan Pablo Garcia',
    location: 'Murray, UT',
    rating: 5,
    text: 'Limpiaron los asientos de mi carro y quedaron bien. Buen precio y servicio rapido.',
    date: '2024-01-12'
  },
  {
    name: 'Amanda Foster',
    location: 'Draper, UT',
    rating: 5,
    text: 'They cleaned our bedrooms and it made a big difference. Nice people, did good work.',
    date: '2024-01-08'
  },
  {
    name: 'Ricardo Morales',
    location: 'South Jordan, UT',
    rating: 5,
    text: 'Got a wine stain out of my carpet that I thought was permanent. Glad I called them!',
    date: '2024-01-03'
  },
  {
    name: 'Jessica Brown',
    location: 'American Fork, UT',
    rating: 4,
    text: 'They cleaned my small office over the weekend. Looked good on Monday. Overall happy with it.',
    date: '2023-12-28'
  },
  {
    name: 'Maria Lopez',
    location: 'West Jordan, UT',
    rating: 5,
    text: 'Me gusto el trabajo. Limpiaron mis muebles y alfombras. Muy educado y trabajador.',
    date: '2023-12-22'
  },
  {
    name: 'Robert Mitchell',
    location: 'Riverton, UT',
    rating: 5,
    text: 'Good work on my RV interior. It needed a deep clean and they did a solid job.',
    date: '2023-12-18'
  },
  {
    name: 'Sofia Ramirez',
    location: 'Herriman, UT',
    rating: 5,
    text: 'Cleaned my furniture and carpets. Quedaron bien limpios. Good service, thanks!',
    date: '2023-12-15'
  },
];
