'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PageHeroProps {
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  description: string;
  backgroundImage: string;
}

export default function PageHero({
  title,
  titleHighlight,
  subtitle,
  description,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <h1
            className="text-white text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-tight"
            style={{ fontFamily: "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            {title}{' '}
            {titleHighlight && (
              <span className="text-primary font-bold">
                {titleHighlight}
              </span>
            )}
            {subtitle && ` ${subtitle}`}
          </h1>

          {/* Subheading */}
          <p
            className="text-white text-xl md:text-2xl lg:text-3xl font-normal max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
