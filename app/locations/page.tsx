import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/constants';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import LocationsContent from '@/components/locations/LocationsContent';

export const metadata: Metadata = {
  title: 'Service Areas | Upholstery & Couch Cleaning Across Utah | LivinGreen',
  description:
    'LivinGreen provides upholstery, couch, sofa and carpet cleaning plus fabric protection across Utah County and Salt Lake County, from Santaquin to Salt Lake City. Find your city.',
  alternates: { canonical: `${COMPANY_INFO.url}/locations` },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Service Areas', url: '/locations' },
        ])}
      />
      <LocationsContent />
    </>
  );
}
