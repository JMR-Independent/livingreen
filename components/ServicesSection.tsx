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
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">Our Services</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Professional cleaning solutions tailored to your needs
            </p>
          </div>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
          {SERVICES.map((service, index) => (
            <ScrollAnimation key={service.id} delay={index * 0.1}>
              <Link href={`/services/${service.slug}`} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-neutral-600 mb-6 flex-grow">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
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

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <span className="text-accent font-bold text-xl">{service.price}</span>
                      <span className="text-primary font-medium group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                        Learn More
                        <svg
                          className="w-4 h-4 ml-1"
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
          ))}
        </div>

        <ScrollAnimation delay={0.6}>
          <div className="text-center mt-16">
            <Link href="/services" className="btn-primary text-lg px-10 py-4">
              View All Services
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
