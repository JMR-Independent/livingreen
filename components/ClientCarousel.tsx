'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollAnimation from './ScrollAnimation';

const certifications = [
  {
    logo: '/images/certifications/epa-safer-choice.svg',
    name: 'EPA Safer Choice',
    description: 'Environmentally Safe Products'
  },
  {
    logo: '/images/certifications/green-seal.svg',
    name: 'Green Seal',
    description: 'Certified Green Products'
  },
  {
    logo: '/images/certifications/ecologo.svg',
    name: 'ECOLOGO',
    description: 'UL Certified Eco-Friendly'
  },
  {
    logo: '/images/certifications/bpi-compostable.svg',
    name: 'Biodegradable',
    description: 'BPI Certified Compostable'
  },
  {
    logo: '/images/certifications/non-toxic.svg',
    name: 'Non-Toxic',
    description: 'Safe for Pets & Children'
  },
  {
    logo: '/images/certifications/chemical-free.svg',
    name: 'Chemical Free',
    description: 'No Harsh Chemicals'
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
                    <div className="w-20 h-20 mb-3 group-hover:scale-110 transition-transform duration-300 relative">
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        fill
                        className="object-contain"
                      />
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
