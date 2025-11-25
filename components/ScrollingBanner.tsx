'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const banner1Words = [
  'ECO-FRIENDLY',
  'NON-TOXIC',
  'BIODEGRADABLE',
  'SUSTAINABLE',
  'GREEN CLEANING',
];

const banner2Words = [
  'CHEMICAL-FREE',
  'SAFE FOR PETS',
  'CERTIFIED',
  'ORGANIC',
  'EARTH-FRIENDLY',
];

export default function ScrollingBanner() {
  const banner1Ref = useRef<HTMLDivElement>(null);
  const banner2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!banner1Ref.current || !banner2Ref.current || !containerRef.current) return;

    // First banner - scroll left
    gsap.to(banner1Ref.current, {
      x: '-70%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Second banner - scroll right (reverse)
    gsap.to(banner2Ref.current, {
      x: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: banner2Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="bg-neutral-50 py-16 overflow-hidden" ref={containerRef}>
      <div className="text-center mb-12">
        <h2 className="text-display-md mb-4">Eco-Friendly Excellence</h2>
        <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
          Over 15 years delivering premium green cleaning solutions with exceptional quality and care for Utah families
        </p>
      </div>

      {/* First Scrolling Banner */}
      <div className="relative py-8 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={banner1Ref}
          className="flex gap-12 whitespace-nowrap"
        >
          {/* Duplicate words for infinite scroll effect */}
          {[...banner1Words, ...banner1Words].map((word, index) => (
            <span
              key={index}
              className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 bg-clip-text text-transparent"
            >
              {word}
              {index < banner1Words.length * 2 - 1 && (
                <span className="mx-8 text-primary/30">•</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Second Scrolling Banner (Reverse Direction) */}
      <div className="relative py-8 overflow-hidden mt-4">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={banner2Ref}
          className="flex gap-12 whitespace-nowrap"
        >
          {/* Duplicate words for infinite scroll effect */}
          {[...banner2Words, ...banner2Words].map((word, index) => (
            <span
              key={index}
              className="inline-block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-accent/15 via-primary/20 to-accent/15 bg-clip-text text-transparent"
            >
              {word}
              {index < banner2Words.length * 2 - 1 && (
                <span className="mx-8 text-accent/30">•</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Trust Badge at Bottom */}
      <div className="mt-12 text-center">
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
    </section>
  );
}
