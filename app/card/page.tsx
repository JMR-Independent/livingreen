import Image from 'next/image';
import { COMPANY_INFO, SERVICES, REVIEWS } from '@/lib/constants';

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
      {/* Header with Logo */}
      <header className="bg-primary text-white py-8 px-4 text-center sticky top-0 z-50 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Image
              src="/images/icon-512x512.png"
              alt="LivinGreen Logo"
              width={60}
              height={60}
              className="rounded-full bg-white p-2"
            />
            <h1 className="text-3xl font-bold">{COMPANY_INFO.name}</h1>
          </div>
          <p className="text-lg opacity-90">{COMPANY_INFO.tagline}</p>
          <p className="text-sm opacity-80 mt-2">{COMPANY_INFO.serviceArea}</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/gallery/gallery-5.jpg"
            alt="Our Professional Work"
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white rounded-2xl py-4 px-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="font-semibold text-sm">WhatsApp</span>
          </a>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="bg-blue-600 text-white rounded-2xl py-4 px-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold text-sm">Call Now</span>
          </a>

          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="bg-red-600 text-white rounded-2xl py-4 px-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-sm">Email</span>
          </a>

          <a
            href={COMPANY_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl py-4 px-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="font-semibold text-sm">Instagram</span>
          </a>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-3 flex items-center gap-2">
            <span className="text-3xl">👋</span>
            About Us
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            LivinGreen is a family business that began in Chile in 2018. After 5 years, we brought our expertise to Utah in 2023. We specialize in professional cleaning with portable equipment that delivers guaranteed results. Hundreds of satisfied customers trust us for their cleaning needs.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <span className="text-3xl">✨</span>
            Our Services
          </h2>
          <div className="space-y-4">
            {SERVICES.slice(0, 5).map((service) => (
              <div key={service.id} className="border-l-4 border-primary pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-neutral-800">{service.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{service.shortDescription}</p>
                  </div>
                  <span className="text-primary font-bold text-sm whitespace-nowrap ml-3">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <a
            href="/"
            className="mt-4 block text-center text-primary font-semibold hover:underline"
          >
            View all services →
          </a>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <span className="text-3xl">📸</span>
            Our Work
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[8, 12, 15, 20].map((num) => (
              <div key={num} className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={`/images/gallery/gallery-${num}.jpg`}
                  alt={`Gallery ${num}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <a
            href="/gallery"
            className="mt-4 block text-center text-primary font-semibold hover:underline"
          >
            See full gallery →
          </a>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            What Customers Say
          </h2>
          <div className="space-y-4">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <div key={index} className="bg-neutral-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed mb-2">{review.text}</p>
                <p className="text-xs text-neutral-500">
                  <strong>{review.name}</strong> - {review.location}
                </p>
              </div>
            ))}
          </div>
          <a
            href="/reviews"
            className="mt-4 block text-center text-primary font-semibold hover:underline"
          >
            Read all reviews →
          </a>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-primary to-green-700 rounded-3xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">✅</span>
            Why Choose Us?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏠</span>
              <span className="flex-1">Family business with personal service</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔧</span>
              <span className="flex-1">Professional portable equipment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <span className="flex-1">Guaranteed results</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌿</span>
              <span className="flex-1">Eco-friendly EPA-certified products</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <span className="flex-1">Fast drying (4-6 hours)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏥</span>
              <span className="flex-1">Experience with medical facilities</span>
            </li>
          </ul>
        </div>

        {/* Service Area */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
            <span className="text-3xl">📍</span>
            Service Area
          </h2>
          <p className="text-neutral-700 mb-3">{COMPANY_INFO.serviceArea}</p>
          <div className="flex flex-wrap gap-2">
            {COMPANY_INFO.cities.map((city) => (
              <span
                key={city}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-green-700 rounded-3xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-6">Get your free quote today!</p>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Message Us on WhatsApp
          </a>
        </div>

        {/* Full Website Link */}
        <div className="text-center py-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Visit Full Website
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center text-neutral-500 text-sm pb-8">
          <p className="mb-2">© 2024 {COMPANY_INFO.name}. All rights reserved.</p>
          <p className="text-xs">Professional Cleaning Services • Utah</p>
        </footer>

      </div>
    </div>
  );
}
