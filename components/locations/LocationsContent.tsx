'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CITIES, COMPANY_INFO, COUCH_IMAGES } from '@/lib/constants';
import Reveal from '@/components/Reveal';

const FONT = "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif";

export default function LocationsContent() {
  const counties = ['Utah County', 'Salt Lake County'] as const;

  return (
    <div style={{ fontFamily: FONT }}>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-black">
        <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: 'easeOut' }} className="absolute inset-0">
          <Image src={COUCH_IMAGES[4]} alt="Upholstery and couch cleaning across Utah" fill priority quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/70 to-neutral-950/85" />
        </motion.div>
        <div className="relative z-10 container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Service Areas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/85"
          >
            Couch, sofa and fabric protection specialists serving every city from Santaquin to Salt Lake City.
          </motion.p>
        </div>
      </section>

      {/* CITY GRIDS */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          {counties.map((county) => (
            <div key={county} className="mb-20 last:mb-0">
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-900">{county}</h2>
                  <div className="flex-grow h-px bg-gradient-to-r from-neutral-200 to-transparent" />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {CITIES.filter((c) => c.county === county).map((c, i) => (
                  <Reveal key={c.slug} delay={Math.min(i * 0.03, 0.4)}>
                    <Link
                      href={`/locations/${c.slug}`}
                      className="group block bg-neutral-50 rounded-2xl p-6 hover:bg-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                    >
                      <p className="text-xs uppercase tracking-widest text-primary group-hover:text-white/70 font-bold mb-1 transition-colors">
                        Utah
                      </p>
                      <p className="text-lg font-bold text-neutral-900 group-hover:text-white transition-colors">{c.name}</p>
                      <p className="text-sm text-neutral-500 group-hover:text-white/80 transition-colors mt-2">
                        Couch cleaning →
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Do not see your city?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/85">
              We serve all of Utah County and Salt Lake County. Give us a call and we will confirm service in your area.
            </p>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-colors duration-300 inline-block"
            >
              Call {COMPANY_INFO.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
