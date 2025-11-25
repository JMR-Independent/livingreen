'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import { SERVICES } from '@/lib/constants';

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-display-md mb-4">Our Services</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs
            </p>
          </div>
        </ScrollAnimation>

        {/* Mobile: Bento Grid - Desktop: Card Grid */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service, index) => {
            // Bento grid pattern for mobile: alternate between large and small
            const isFeatured = index % 3 === 0;
            const mobileGridClass = isFeatured ? 'col-span-2' : 'col-span-1';

            return (
              <ScrollAnimation key={service.id} delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`${mobileGridClass} md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]`}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                  >
                  {/* Image */}
                  <div className={`relative ${isFeatured ? 'h-48' : 'h-32'} md:h-64 overflow-hidden`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6 flex-grow flex flex-col">
                    <h3 className="text-primary text-base md:text-2xl font-bold mb-1 md:mb-3">
                      {service.title}
                    </h3>

                    {/* Featured services show more info on mobile */}
                    {isFeatured ? (
                      <>
                        <p className="text-neutral-600 text-xs md:text-base mb-2 md:mb-6 flex-grow line-clamp-2">
                          {service.shortDescription}
                        </p>
                        <ul className="space-y-1 md:space-y-2 mb-3 md:mb-6 hidden md:block">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-neutral-700">
                              <svg
                                className="w-5 h-5 text-accent mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-neutral-600 text-xs md:text-base mb-2 md:mb-6 flex-grow line-clamp-1 md:line-clamp-none">
                        {service.shortDescription}
                      </p>
                    )}

                    {/* Features only on desktop for non-featured */}
                    {!isFeatured && (
                      <ul className="space-y-2 mb-6 hidden md:block">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-neutral-700">
                            <svg
                              className="w-5 h-5 text-accent mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-neutral-200 mt-auto">
                      <span className="text-accent font-bold text-sm md:text-xl">{service.price}</span>
                      <span className="text-primary font-medium text-xs md:text-base group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                        {isFeatured ? 'Learn More' : 'View'}
                        <svg
                          className="w-3 h-3 md:w-4 md:h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollAnimation>
          );
          })}
        </div>

        <ScrollAnimation delay={0.6}>
          <div className="text-center mt-8 md:mt-16">
            <Link href="/services" className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4">
              View All Services
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
