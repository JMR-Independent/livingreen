'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ScrollAnimation from './ScrollAnimation';

const clients = [
  { name: 'Consorcio', logo: '/images/2018/01/2-consorcio.png' },
  { name: 'Armas', logo: '/images/2018/01/1-armas.png' },
  { name: 'Centro Cultural', logo: '/images/2018/01/3-centro-cultural-la-moneda.png' },
  { name: 'Socovesa', logo: '/images/2018/01/4-socovesa.png' },
  { name: 'UDD', logo: '/images/2018/01/6-udd.png' },
  { name: 'Demaria', logo: '/images/2018/01/5-demaria.png' },
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
              {clients.map((client, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-32 flex items-center justify-center group">
                    <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
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
