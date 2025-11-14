'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ScrollAnimation from './ScrollAnimation';
import { REVIEWS } from '@/lib/constants';

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">What Our Customers Say</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="relative max-w-6xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-16 px-4"
            >
              {REVIEWS.map((review, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-neutral-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-neutral-700 mb-6 flex-grow italic leading-relaxed">
                      "{review.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{review.name}</p>
                        <p className="text-sm text-neutral-600">{review.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollAnimation>

        {/* Google Reviews Badge */}
        <ScrollAnimation delay={0.4}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-neutral-50 px-8 py-4 rounded-full shadow-md">
              <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-semibold text-neutral-900">5.0 Rating</p>
              </div>
              <div className="h-12 w-px bg-neutral-300" />
              <div>
                <p className="text-2xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-600">Reviews</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
