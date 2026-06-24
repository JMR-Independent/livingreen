import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

// Embedded Google Map on the home page. Reinforces local relevance and links
// Google Maps directly to the site (a technical local-SEO trust signal).
export default function ServiceAreaMap() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-primary text-sm font-bold mb-3">Where we work</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Serving Utah County &amp; Salt Lake County
          </h2>
          <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto">
            From Santaquin to Salt Lake City, we bring professional upholstery and couch cleaning to your door.{' '}
            <Link href="/locations" className="text-primary font-semibold underline decoration-primary/30 hover:decoration-primary">
              Find your city
            </Link>
            .
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <iframe
            title={`${COMPANY_INFO.name} service area in Utah`}
            src="https://maps.google.com/maps?q=Utah%20County%2C%20UT&z=9&output=embed"
            className="w-full h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
