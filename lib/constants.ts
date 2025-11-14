export const COMPANY_INFO = {
  name: 'LivinGreen',
  tagline: 'Professional Cleaning Services',
  phone: '+1 (801) 555-0100',
  phoneDisplay: '(801) 555-0100',
  whatsapp: '+18015550100',
  email: 'info@livingreen.com',
  address: {
    street: '123 Main Street',
    city: 'Santaquin',
    state: 'Utah',
    zip: '84655',
    full: '123 Main Street, Santaquin, UT 84655'
  },
  serviceArea: 'Serving from Santaquin to Salt Lake City',
  cities: ['Santaquin', 'Spanish Fork', 'Provo', 'Orem', 'Salt Lake City'],
  hours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Sat: 9:00 AM - 2:00 PM',
    sunday: 'Sun: Closed'
  },
  social: {
    facebook: 'https://facebook.com/livingreenutah',
    instagram: 'https://instagram.com/livingreenutah',
    linkedin: 'https://linkedin.com/company/livingreenutah',
  }
};

export const SERVICES = [
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    shortDescription: 'Professional cleaning for all types of carpets',
    description: 'Deep cleaning that restores your carpets to their original beauty. Safe for all materials including wool, silk, and synthetic fibers.',
    image: '/images/services/carpet-cleaning.jpg',
    features: [
      'Deep extraction cleaning',
      'Stain removal treatment',
      'Deodorization',
      '99.9% allergen elimination',
      'Fast drying (5 hours)',
      'Eco-friendly products'
    ],
    price: 'Starting at $89',
  },
  {
    id: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    slug: 'upholstery-cleaning',
    shortDescription: 'Expert cleaning for sofas, chairs, and furniture',
    description: 'Restore the beauty and freshness of your upholstered furniture with our professional cleaning service.',
    image: '/images/services/upholstery-cleaning.jpg',
    features: [
      'Safe for all fabric types',
      'Stain and odor removal',
      'Quick dry technology',
      'Pet-friendly solutions',
      'Fabric protection available',
      'Color restoration'
    ],
    price: 'Starting at $119',
  },
  {
    id: 'chair-cleaning',
    title: 'Chair Cleaning',
    slug: 'chair-cleaning',
    shortDescription: 'Professional cleaning for dining and office chairs',
    description: 'Specialized cleaning service for all types of chairs, from dining room sets to office furniture, restoring comfort and appearance.',
    image: '/images/services/chair-cleaning.jpg',
    features: [
      'All chair types welcome',
      'Fabric and leather cleaning',
      'Stain removal',
      'Odor elimination',
      'Quick drying process',
      'Safe for all materials'
    ],
    price: 'Starting at $79',
  },
  {
    id: 'mattress-cleaning',
    title: 'Mattress Cleaning',
    slug: 'mattress-cleaning',
    shortDescription: 'Deep sanitization for healthier sleep',
    description: 'Eliminate dust mites, allergens, and bacteria from your mattress for a cleaner, healthier sleep environment.',
    image: '/images/services/mattress-cleaning.jpg',
    features: [
      'Dust mite elimination',
      'Deep sanitization',
      'Allergen removal',
      'Odor neutralization',
      'Stain treatment',
      'Dry in 4-6 hours'
    ],
    price: 'Starting at $99',
  },
  {
    id: 'car-interior',
    title: 'Car Interior Detailing',
    slug: 'car-interior',
    shortDescription: 'Complete interior cleaning and detailing',
    description: 'Professional cleaning for your vehicle interior including seats, carpets, and all surfaces.',
    image: '/images/services/car-interior.jpg',
    features: [
      'Seat and carpet cleaning',
      'Dashboard and console detailing',
      'Door panel cleaning',
      'Odor elimination',
      'Pet hair removal',
      'Leather conditioning'
    ],
    price: 'Starting at $149',
  },
  {
    id: 'protection',
    title: 'Protection & Waterproofing',
    slug: 'protection',
    shortDescription: 'Shield your carpets and upholstery',
    description: 'Professional fabric protection treatment to repel stains, spills, and dirt, extending the life of your furnishings.',
    image: '/images/services/protection.webp',
    features: [
      'Scotchgard protection',
      'Water and stain repellent',
      'UV protection',
      'Extends fabric life',
      'Easy maintenance',
      '1-year protection guarantee'
    ],
    price: 'Starting at $69',
  },
];

export const FAQS = [
  {
    question: 'How is the cleaning service priced?',
    answer: 'For area rugs, we price by size categories (Small, Medium, Large, XL). For upholstery, we price by piece. For mattresses, we have standard pricing based on size (Twin, Full, Queen, King). We provide free estimates for all services.'
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
    answer: 'We use professional-grade Swiss and German equipment, eco-friendly certified products, and our technicians have 15+ years of experience. We use 80% less water than traditional methods, offer same-day service, provide satisfaction guarantee, and have served thousands of satisfied customers in Utah.'
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
