'use client';

import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO, SERVICES } from '@/lib/constants';
import { useState } from 'react';

export default function DigitalCard() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in your cleaning services.`
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Image with gradient fade - Compact on mobile (max 1/4 screen) */}
      <div className="relative w-full h-[38vh] md:h-[70vh]">
        <Image
          src="/images/gallery/gallery-7.jpg"
          alt="LivinGreen Professional Cleaning"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 60%' }}
          priority
        />
        {/* Gradient fade effect - from transparent to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"
             style={{
               background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,1) 100%)'
             }}
        />
      </div>

      {/* Circular Logo - compact on mobile, large on desktop */}
      <div className="relative -mt-14 md:-mt-24 mb-6 md:mb-8 flex justify-center z-10">
        <div className="relative w-28 h-28 md:w-48 md:h-48 rounded-full bg-white shadow-2xl p-3 md:p-6 flex items-center justify-center ring-4 md:ring-8 ring-white">
          <Image
            src="/images/logo.png"
            alt="LivinGreen Logo"
            width={320}
            height={320}
            className="object-contain scale-125 md:scale-150"
            priority
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-12 space-y-12">

        {/* Services Grid - 2x2 Professional */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-neutral-100 bg-white hover:border-primary hover:shadow-2xl transition-all duration-300 text-left w-full p-0 m-0"
              >
                {/* Service Image - Full Width Banner - Flush with top */}
                <div className="relative w-full h-[130px] flex-shrink-0 rounded-t-[22px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Service Info */}
                <div className="flex flex-col flex-1 items-center text-center p-4">
                  <h3 className="font-bold text-neutral-900 mb-2 text-base">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Price */}
                  <div className="mt-auto w-full">
                    <div className="bg-primary/10 text-primary font-bold text-sm py-2 px-4 rounded-xl">
                      {service.price}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Contact Buttons - Minimal Design */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-8 text-center">
            Get in Touch
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                <svg className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-[#25D366]">WhatsApp</span>
            </a>

            {/* Phone */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-blue-600">Call</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-red-600 hover:bg-red-50/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-red-600">Email</span>
            </a>

            {/* Instagram */}
            <a
              href={COMPANY_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-pink-600 hover:bg-pink-50/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-neutral-700 group-hover:text-pink-600">Instagram</span>
            </a>
          </div>

          {/* Website Button - Full Width */}
          <Link
            href="/"
            className="mt-4 w-full flex items-center justify-center gap-3 p-5 rounded-2xl border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 transition-all duration-300 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Visit Full Website
          </Link>
        </section>

        {/* Footer - Minimal */}
        <footer className="pt-8 pb-12 text-center border-t border-neutral-100">
          <p className="text-xs text-neutral-400">
            © 2024 {COMPANY_INFO.name} • Professional Cleaning Services
          </p>
        </footer>

      </div>

      {/* Service Detail Modal - Outside main container */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                {selectedService.title}
              </h2>
              <p className="text-xl text-primary font-bold mb-4">
                {selectedService.price}
              </p>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {selectedService.description}
              </p>

              {/* Features List */}
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                    What's Included:
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in ${selectedService.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
