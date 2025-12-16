import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO, SERVICES } from '@/lib/constants';

export const metadata = {
  title: 'LivinGreen - Digital Business Card',
  description: 'Professional carpet, upholstery & mattress cleaning in Utah. Family business serving from Santaquin to Salt Lake City. Get a free quote today!',
  openGraph: {
    title: 'LivinGreen - Professional Cleaning Services',
    description: 'Family business • Portable Equipment • Guaranteed Results • Serving Utah',
    images: [
      {
        url: '/images/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'LivinGreen Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivinGreen - Professional Cleaning Services',
    description: 'Family business serving Utah • Get a free quote today!',
    images: ['/images/icon-512x512.png'],
  },
};

export default function DigitalCard() {
  const whatsappMessage = encodeURIComponent(
    `Hi! I found your digital card and I'm interested in your cleaning services.`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-2xl mx-auto">

        {/* Hero Image */}
        <div className="w-full">
          <Image
            src="/images/gallery/gallery-5.jpg"
            alt="LivinGreen Professional Cleaning"
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="px-4 py-6 space-y-6">

        {/* Services Section - Bento Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800 text-center mb-6 flex items-center justify-center gap-2">
            <span className="text-3xl">✨</span>
            Our Services
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 ${
                  index === 0 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-base mb-1">{service.title}</h3>
                    <p className="text-primary text-sm font-bold">{service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="space-y-3 pt-4">
          <h2 className="text-2xl font-bold text-neutral-800 text-center mb-4">
            Contact Us
          </h2>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="font-semibold text-lg">Message on WhatsApp</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="bg-blue-600 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold text-lg">Call {COMPANY_INFO.phoneDisplay}</span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="bg-red-600 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-lg">Send Email</span>
          </a>

          <a
            href={COMPANY_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-semibold text-lg">Follow on Instagram</span>
          </a>

          <Link
            href="/"
            className="bg-neutral-800 text-white rounded-2xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="font-semibold text-lg">Visit Full Website</span>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-neutral-500 text-sm py-8">
          <p className="mb-2">© 2024 {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="text-xs">Professional Cleaning Services • Utah</p>
        </footer>

      </div>
    </div>
  );
}
