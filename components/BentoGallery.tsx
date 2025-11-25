'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

type BentoItemSize = 'large' | 'medium' | 'small';
type BentoItemColor = 'green' | 'dark';

interface BentoImageItem {
  type: 'image';
  src: string;
  title?: string;
  subtitle?: string;
  size: BentoItemSize;
  overlay?: boolean;
}

interface BentoTextItem {
  type: 'text';
  title: string;
  description: string;
  size: BentoItemSize;
  color: BentoItemColor;
}

type BentoItem = BentoImageItem | BentoTextItem;

interface Slide {
  items: BentoItem[];
}

const slides: Slide[] = [
  {
    items: [
      {
        type: 'image',
        src: '/images/gallery/gallery-1.jpg',
        title: 'LivinGreen',
        subtitle: 'Utah\'s Green Cleaning Experts',
        size: 'large',
        overlay: true,
      },
      {
        type: 'text',
        title: 'Eco-Friendly',
        description: 'Non-toxic products safe for your family and pets',
        size: 'small',
        color: 'green',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-6.jpg',
        size: 'medium',
      },
      {
        type: 'text',
        title: 'Professional Results',
        description: 'Experience spotless cleaning with sustainable methods and exceptional care',
        size: 'medium',
        color: 'dark',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-11.jpg',
        size: 'medium',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-16.jpg',
        size: 'small',
      },
      {
        type: 'text',
        title: 'Certified',
        description: 'EPA Safer Choice certified green cleaning services',
        size: 'small',
        color: 'green',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-21.jpg',
        size: 'small',
      },
    ],
  },
  {
    items: [
      {
        type: 'image',
        src: '/images/gallery/gallery-26.jpg',
        title: 'Deep Cleaning',
        subtitle: 'Thorough & sustainable solutions',
        size: 'large',
        overlay: true,
      },
      {
        type: 'text',
        title: 'Upholstery',
        description: 'Gentle on fabrics, tough on stains with eco-friendly treatments',
        size: 'small',
        color: 'green',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-2.jpg',
        size: 'medium',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-7.jpg',
        size: 'medium',
      },
      {
        type: 'text',
        title: '15+ Years',
        description: 'Trusted by Utah families for over a decade',
        size: 'medium',
        color: 'dark',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-12.jpg',
        size: 'small',
      },
      {
        type: 'image',
        src: '/images/gallery/gallery-17.jpg',
        size: 'small',
      },
      {
        type: 'text',
        title: 'Satisfaction',
        description: '100% satisfaction guarantee on all services',
        size: 'small',
        color: 'green',
      },
    ],
  },
];

export default function BentoGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getGridClass = (size: BentoItemSize): string => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  const getColorClass = (color: BentoItemColor): string => {
    switch (color) {
      case 'green':
        return 'bg-gradient-to-br from-primary/90 to-primary/70';
      case 'dark':
        return 'bg-gradient-to-br from-neutral-800 to-neutral-700';
      default:
        return 'bg-neutral-800';
    }
  };

  return (
    <section className="section-padding bg-neutral-900">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4 text-white">Our Work</h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              See the difference our professional green cleaning services make
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
              >
                {slides[currentSlide].items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${getGridClass(item.size)} rounded-2xl overflow-hidden group relative`}
                  >
                    {item.type === 'image' ? (
                      <>
                        <Image
                          src={item.src}
                          alt={item.title || 'Gallery image'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {item.overlay && item.title && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 md:p-8">
                            <div>
                              <h3 className="text-white text-3xl md:text-5xl font-bold mb-2">
                                {item.title}
                              </h3>
                              {item.subtitle && (
                                <p className="text-white/80 text-sm md:text-base">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className={`${getColorClass(item.color)} h-full flex flex-col justify-center items-start p-6 md:p-8 group-hover:scale-[1.02] transition-transform duration-300`}
                      >
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm font-semibold tracking-wider"
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm font-semibold tracking-wider"
              >
                Next
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 justify-center mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-neutral-600 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
