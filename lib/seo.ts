import { COMPANY_INFO, CITIES, SERVICES, City } from './constants';

// Localized FAQs for each city page (used for both the visible accordion and FAQ schema).
export function cityFaqs(city: City) {
  return [
    {
      question: `How much does couch cleaning cost in ${city.name}?`,
      answer: `Couch and upholstery cleaning in ${city.name} starts at $35 for a single seat sofa, $65 for a loveseat, $85 for a three seat sofa, and from $100 for sectionals. You always get a free, no obligation estimate first.`,
    },
    {
      question: `Do you offer couch and sofa cleaning near me in ${city.name}?`,
      answer: `Yes. LivinGreen serves all of ${city.name} and ${city.county}. We come to your home with everything we need to clean couches, sofas, sectionals, loveseats and recliners, plus fabric protection.`,
    },
    {
      question: `How long does upholstery take to dry?`,
      answer: `Our hot water extraction uses about 80% less water than older methods, so most sofas and upholstery in ${city.name} are dry in just 4 to 6 hours.`,
    },
    {
      question: `Are your products safe for kids and pets?`,
      answer: `Absolutely. We use eco friendly, non toxic products that are safe for children and pets in your ${city.name} home, while still removing tough stains, odors and allergens.`,
    },
  ];
}

const BASE = COMPANY_INFO.url;

// Stable @id so every schema points at the same business entity.
const BUSINESS_ID = `${BASE}/#business`;

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: COMPANY_INFO.name,
    description:
      'Utah County upholstery, couch and sofa cleaning specialists. Fabric & stain protection, plus carpet, mattress and car interior cleaning. Eco friendly, fast drying. Serving from Santaquin to Salt Lake City.',
    url: BASE,
    telephone: COMPANY_INFO.phone,
    image: `${BASE}/images/icon-512x512.png`,
    logo: `${BASE}/images/icon-512x512.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.stateCode,
      postalCode: COMPANY_INFO.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9755,
      longitude: -111.7846,
    },
    areaServed: CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, UT` })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.rating.value,
      reviewCount: COMPANY_INFO.rating.count,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [COMPANY_INFO.social.facebook, COMPANY_INFO.social.instagram, COMPANY_INFO.social.linkedin],
  };
}

export function serviceSchema(
  service: { title: string; description: string; slug: string },
  city?: City
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city ? `${service.title} in ${city.name}, UT` : service.title,
    serviceType: service.title,
    description: service.description,
    url: city ? `${BASE}/locations/${city.slug}` : `${BASE}/services/${service.slug}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: city
      ? { '@type': 'City', name: `${city.name}, UT` }
      : [
          { '@type': 'AdministrativeArea', name: 'Utah County, UT' },
          { '@type': 'AdministrativeArea', name: 'Salt Lake County, UT' },
        ],
  };
}

export function cityServicesSchema(city: City): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE}/locations/${city.slug}/#business`,
    name: `${COMPANY_INFO.name}, Upholstery Cleaning ${city.name}`,
    parentOrganization: { '@id': BUSINESS_ID },
    url: `${BASE}/locations/${city.slug}`,
    telephone: COMPANY_INFO.phone,
    image: `${BASE}/images/icon-512x512.png`,
    priceRange: '$$',
    areaServed: { '@type': 'City', name: `${city.name}, UT` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY_INFO.rating.value,
      reviewCount: COMPANY_INFO.rating.count,
    },
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `${s.title} in ${city.name}, UT` },
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.url}`,
    })),
  };
}
