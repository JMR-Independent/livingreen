'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

const heroSlides = [
  {
    image: '/images/2020/04/Header5-2.jpg',
    title: 'Professional',
    titleHighlight: 'Cleaning',
    subtitle: 'Services',
    description: 'Experience the pleasure of walking on clean carpets',
  },
  {
    image: '/images/2020/04/Servicio-Alfombras-OK.jpg',
    title: 'Expert',
    titleHighlight: 'Carpet',
    subtitle: 'Cleaning',
    description: 'Deep cleaning that restores your rugs to their original beauty',
  },
  {
    image: '/images/2020/04/1.jpg',
    title: 'Trusted',
    titleHighlight: 'Upholstery',
    subtitle: 'Care',
    description: 'Professional furniture cleaning for a healthier home',
  },
  {
    image: '/images/2020/04/6.jpg',
    title: 'Certified',
    titleHighlight: 'Cleaning',
    subtitle: 'Experts',
    description: 'Over 15 years serving Utah families and businesses',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to get a quote for cleaning services.`
  );

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // TRANSICIÓN 1 - 3D Rotation (GUARDADA)
  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     scale: 1.2,
  //     opacity: 0,
  //     rotateY: direction > 0 ? 15 : -15,
  //     z: -100,
  //   }),
  //   center: {
  //     scale: 1,
  //     opacity: 1,
  //     rotateY: 0,
  //     z: 0,
  //   },
  //   exit: (direction: number) => ({
  //     scale: 0.8,
  //     opacity: 0,
  //     rotateY: direction > 0 ? -15 : 15,
  //     z: -100,
  //   }),
  // };

  // TRANSICIÓN 2 - Parallax Depth (GUARDADA)
  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     y: direction > 0 ? '100%' : '-100%',
  //     scale: 0.7,
  //     opacity: 0,
  //     rotateX: direction > 0 ? 25 : -25,
  //     filter: 'blur(20px)',
  //   }),
  //   center: {
  //     y: '0%',
  //     scale: 1,
  //     opacity: 1,
  //     rotateX: 0,
  //     filter: 'blur(0px)',
  //   },
  //   exit: (direction: number) => ({
  //     y: direction > 0 ? '-100%' : '100%',
  //     scale: 1.3,
  //     opacity: 0,
  //     rotateX: direction > 0 ? -25 : 25,
  //     filter: 'blur(20px)',
  //   }),
  // };

  // TRANSICIÓN 3 - Disintegration Slide (GUARDADA)
  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     x: direction > 0 ? '100%' : '-100%',
  //     opacity: 0,
  //     scale: 1.1,
  //     filter: 'blur(0px) saturate(0.5)',
  //     clipPath: direction > 0
  //       ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
  //       : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  //   }),
  //   center: {
  //     x: '0%',
  //     opacity: 1,
  //     scale: 1,
  //     filter: 'blur(0px) saturate(1)',
  //     clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  //   },
  //   exit: (direction: number) => ({
  //     x: direction > 0 ? '-100%' : '100%',
  //     opacity: 0,
  //     scale: 0.9,
  //     filter: 'blur(10px) saturate(0.3) brightness(0.5)',
  //     clipPath: direction > 0
  //       ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
  //       : 'polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)',
  //   }),
  // };

  // TRANSICIÓN 4 - Smooth Figma Morph (GUARDADA)
  // const slideVariants = {
  //   enter: (direction: number) => ({
  //     x: direction > 0 ? '30%' : '-30%',
  //     opacity: 0,
  //     scale: 0.95,
  //   }),
  //   center: {
  //     x: '0%',
  //     opacity: 1,
  //     scale: 1,
  //   },
  //   exit: (direction: number) => ({
  //     x: direction > 0 ? '-30%' : '30%',
  //     opacity: 0,
  //     scale: 1.05,
  //   }),
  // };

  // TRANSICIÓN 5 - Ultra Modern 2025 Liquid Morph (NUEVA)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(20px) brightness(1.3) saturate(1.5)',
    }),
    center: {
      x: '0%',
      rotateY: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) brightness(1) saturate(1)',
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-50%' : '50%',
      rotateY: direction > 0 ? -20 : 20,
      opacity: 0,
      scale: 1.2,
      filter: 'blur(30px) brightness(0.7) saturate(0.5)',
    }),
  };

  const contentVariants = {
    enter: {
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotateX: 20,
    },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
    },
    exit: {
      y: -80,
      opacity: 0,
      scale: 0.9,
      rotateX: -20,
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black" style={{ perspective: '2000px' }}>
      {/* Background Images with Slide Transition */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 40, damping: 25, mass: 1.5 },
              rotateY: { type: 'spring', stiffness: 50, damping: 30 },
              scale: { type: 'spring', stiffness: 60, damping: 28 },
              opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroSlides[currentSlide].image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 70, damping: 25, mass: 1 },
              opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              scale: { type: 'spring', stiffness: 80, damping: 22 },
              rotateX: { type: 'spring', stiffness: 60, damping: 28 },
            }}
            className="space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Main Heading */}
            <h1
              className="text-white text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight"
              style={{ fontFamily: "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {heroSlides[currentSlide].title}{' '}
              <span className="text-primary font-bold">
                {heroSlides[currentSlide].titleHighlight}
              </span>{' '}
              {heroSlides[currentSlide].subtitle}
            </h1>

            {/* Subheading */}
            <p
              className="text-white text-xl md:text-2xl lg:text-3xl font-normal max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-10 py-4 shadow-2xl hover:shadow-accent/50"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Message Us
                </span>
              </a>
              <Link
                href="/contact"
                className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-neutral-900 text-lg px-10 py-4"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Service Area */}
            <p className="text-white/80 text-sm mt-8">
              {COMPANY_INFO.serviceArea}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
