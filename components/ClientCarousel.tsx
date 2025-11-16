'use client';

import { useEffect, useRef, ReactElement } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollAnimation from './ScrollAnimation';

const CertBadge = ({ type, className }: { type: string, className?: string }) => {
  const badges: { [key: string]: ReactElement } = {
    epa: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#4CAF50"/>
        <path d="M50 20L60 40L80 45L65 60L68 80L50 70L32 80L35 60L20 45L40 40L50 20Z" fill="white"/>
        <text x="50" y="92" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">EPA</text>
      </svg>
    ),
    nontoxic: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#2196F3"/>
        <path d="M35 50L45 60L65 40" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="30" cy="30" r="8" fill="white"/>
        <circle cx="70" cy="30" r="8" fill="white"/>
      </svg>
    ),
    green: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#00BCD4"/>
        <path d="M50 25C50 25 30 35 30 55C30 68 38 75 50 75C62 75 70 68 70 55C70 35 50 25 50 25Z" fill="white"/>
        <circle cx="50" cy="50" r="8" fill="#00BCD4"/>
      </svg>
    ),
    bio: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#8BC34A"/>
        <path d="M40 30L50 20L60 30M50 20V50M50 50L35 65M50 50L65 65" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    chemical: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#009688"/>
        <rect x="25" y="45" width="50" height="10" rx="5" fill="white"/>
        <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="4" fill="none"/>
      </svg>
    ),
    pro: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" fill="#FF9800"/>
        <path d="M50 25L58 45L80 48L65 62L69 84L50 74L31 84L35 62L20 48L42 45L50 25Z" fill="white"/>
      </svg>
    ),
  };

  return badges[type] || badges.epa;
};

const certifications = [
  {
    type: 'epa',
    name: 'EPA Safer Choice',
    description: 'Environmentally Safe Products'
  },
  {
    type: 'nontoxic',
    name: 'Non-Toxic',
    description: 'Safe for Pets & Children'
  },
  {
    type: 'green',
    name: 'Green Certified',
    description: 'Eco-Friendly Standards'
  },
  {
    type: 'bio',
    name: 'Biodegradable',
    description: '100% Biodegradable'
  },
  {
    type: 'chemical',
    name: 'Chemical Free',
    description: 'No Harsh Chemicals'
  },
  {
    type: 'pro',
    name: 'Pro Quality',
    description: 'Professional Grade'
  },
];

export default function ClientCarousel() {
  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">Eco-Friendly Excellence</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Over 15 years delivering premium green cleaning solutions with exceptional quality and care for Utah families
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              className="pb-12"
            >
              {certifications.map((cert, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-44 flex flex-col items-center justify-center group">
                    <div className="w-20 h-20 mb-3 group-hover:scale-110 transition-transform duration-300">
                      <CertBadge type={cert.type} className="w-full h-full" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-800 text-center mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-neutral-500 text-center">
                      {cert.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold border-2 border-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="pl-2">
                <p className="text-sm font-semibold text-neutral-900">Trusted Green Cleaning Experts</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
