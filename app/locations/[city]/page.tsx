import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CITIES, SERVICES, COMPANY_INFO } from '@/lib/constants';
import { cityServicesSchema, breadcrumbSchema, serviceSchema, faqSchema, cityFaqs } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CityPageContent from '@/components/locations/CityPageContent';

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return { title: 'Location Not Found' };

  const title = `Upholstery & Couch Cleaning in ${city.name}, UT | LivinGreen`;
  const description = `Professional upholstery, couch, sofa and sectional cleaning plus fabric protection in ${city.name}, Utah. Eco-friendly, fast drying, 5-star rated. Carpet, mattress and car interior cleaning too. Free estimates, call ${COMPANY_INFO.phoneDisplay}.`;
  const url = `${COMPANY_INFO.url}/locations/${city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const focusServices = SERVICES.filter((s) => s.focus);

  return (
    <>
      <JsonLd data={cityServicesSchema(city)} />
      <JsonLd data={serviceSchema(focusServices[0], city)} />
      <JsonLd data={faqSchema(cityFaqs(city))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Service Areas', url: '/locations' },
          { name: `${city.name}, UT`, url: `/locations/${city.slug}` },
        ])}
      />
      <CityPageContent city={city} />
    </>
  );
}
