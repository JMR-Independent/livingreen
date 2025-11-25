'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const banner1Words = [
  'CARPETS',
  'SOFAS',
  'MATTRESSES',
  'RUGS',
  'UPHOLSTERY',
  'CARS',
];

const banner2Words = [
  'STAINS',
  'WINE',
  'COFFEE',
  'GREASE',
  'MUD',
  'URINE',
  'ODORS',
  'DIRT',
];

const banner3Words = [
  'SAFE FOR PETS',
  'NON TOXIC',
  'NATURAL',
  'EFFECTIVE',
  'ECO FRIENDLY',
];

export default function ScrollingBanner() {
  const banner1Ref = useRef<HTMLDivElement>(null);
  const banner2Ref = useRef<HTMLDivElement>(null);
  const banner3Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!banner1Ref.current || !banner2Ref.current || !banner3Ref.current || !containerRef.current) return;

    // First banner - scroll left (faster)
    gsap.to(banner1Ref.current, {
      x: '-100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
      },
    });

    // Second banner - scroll right (reverse, slower)
    gsap.fromTo(banner2Ref.current,
      {
        x: '-400%'
      },
      {
        x: '-100%',
        ease: 'none',
        scrollTrigger: {
          trigger: banner2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      }
    );

    // Third banner - scroll left (faster)
    gsap.to(banner3Ref.current, {
      x: '-100%',
      ease: 'none',
      scrollTrigger: {
        trigger: banner3Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
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
      <div className="relative py-6 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={banner1Ref}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...banner1Words, ...banner1Words, ...banner1Words, ...banner1Words, ...banner1Words, ...banner1Words].map((word, index) => (
            <span
              key={index}
              className="inline-block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 bg-clip-text text-transparent"
            >
              {word}
              <span className="mx-6 text-primary/30">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Second Scrolling Banner (Reverse Direction) */}
      <div className="relative py-6 overflow-hidden mt-2">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={banner2Ref}
          className="flex gap-8 whitespace-nowrap"
        >
          {Array(40).fill(banner2Words).flat().map((word, index) => (
            <span
              key={index}
              className="inline-block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent/15 via-primary/20 to-accent/15 bg-clip-text text-transparent"
            >
              {word}
              <span className="mx-6 text-accent/30">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Third Scrolling Banner */}
      <div className="relative py-6 overflow-hidden mt-2">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={banner3Ref}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...banner3Words, ...banner3Words, ...banner3Words, ...banner3Words, ...banner3Words, ...banner3Words].map((word, index) => (
            <span
              key={index}
              className="inline-block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 bg-clip-text text-transparent"
            >
              {word}
              <span className="mx-6 text-primary/30">•</span>
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
