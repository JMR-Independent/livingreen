'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CITIES,
  SERVICES,
  COMPANY_INFO,
  REVIEWS,
  UPHOLSTERY_TYPES,
  COUCH_IMAGES,
  City,
} from '@/lib/constants';
import Reveal from '@/components/Reveal';
import { cityFaqs } from '@/lib/seo';

const FONT = "'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif";

export default function CityPageContent({ city }: { city: City }) {
  const cityIndex = Math.max(0, CITIES.findIndex((c) => c.slug === city.slug));
  const heroImg = COUCH_IMAGES[cityIndex % COUCH_IMAGES.length];
  const galleryImgs = Array.from({ length: 6 }, (_, i) => COUCH_IMAGES[(cityIndex + i) % COUCH_IMAGES.length]);
  const cityReviews = REVIEWS.filter((r) => r.location.toLowerCase().includes(city.name.toLowerCase()));
  const reviews = (cityReviews.length ? cityReviews : REVIEWS).slice(0, 3);
  const nearby = CITIES.filter((c) => c.county === city.county && c.slug !== city.slug).slice(0, 8);

  const faqs = cityFaqs(city);
  const whatsapp = encodeURIComponent(
    `Hi! I'm in ${city.name}, UT and I'd like a free quote for couch and upholstery cleaning.`
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ fontFamily: FONT }}>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image src={heroImg} alt={`Couch and upholstery cleaning in ${city.name}, Utah`} fill priority quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/65 to-neutral-950/85" />
        </motion.div>

        <div className="relative z-10 container-custom text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.3em] text-accent text-sm font-bold mb-6"
          >
            Serving {city.county}, Utah
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
          >
            Upholstery &amp; Couch Cleaning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              in {city.name}, Utah
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/85 leading-relaxed mb-10"
          >
            We bring sofas, couches and sectionals back to life right at your home. Eco friendly, fast drying, and safe for kids and pets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-10 py-4 shadow-xl shadow-accent/20">
              Get a Free Quote
            </a>
            <a href={`tel:${COMPANY_INFO.phone}`} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-primary transition-all duration-300">
              Call {COMPANY_INFO.phoneDisplay}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-neutral-950 text-white">
        <div className="container-custom py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { big: '5.0', small: 'Star rated' },
            { big: '4 to 6 hrs', small: 'Fast drying' },
            { big: 'Eco', small: 'Safe for kids & pets' },
            { big: 'Free', small: 'On site estimates' },
          ].map((s, i) => (
            <Reveal key={s.small} delay={i * 0.08}>
              <p className="text-2xl md:text-3xl font-bold text-accent">{s.big}</p>
              <p className="text-sm text-white/60 mt-1">{s.small}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-14 items-center max-w-6xl">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={galleryImgs[1]} alt={`Professional sofa cleaning in ${city.name}, UT`} fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="uppercase tracking-widest text-primary text-sm font-bold mb-4">Local couch cleaning, done right</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-6 leading-tight">
              Fresh, clean furniture for {city.name} homes
            </h2>
            <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
              <p>
                When your couch starts looking tired, you do not need to replace it. Our deep hot water extraction lifts out dirt, stains, odors and allergens from sofas, sectionals, loveseats and recliners, then leaves them soft, fresh and dry in just a few hours.
              </p>
              <p>
                We come to you anywhere in {city.name} and across {city.county} with everything we need. After cleaning we can add a fabric and stain protector so spills bead up instead of soaking in, keeping your furniture looking new for longer.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Eco friendly products', 'No harsh chemicals', '5 star guarantee'].map((t) => (
                <span key={t} className="inline-flex items-center gap-2 text-neutral-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FURNITURE WE CLEAN */}
      <section className="section-padding bg-neutral-950 text-white overflow-hidden">
        <div className="container-custom max-w-5xl text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Furniture we clean</h2>
            <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
              From a single armchair to a large sectional, our {city.name} team cleans it all.
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {UPHOLSTERY_TYPES.map((type, i) => (
              <motion.span
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.5) }}
                className="px-5 py-2.5 bg-white/[0.06] rounded-full text-white/90 border border-white/10 hover:border-accent/60 hover:text-white transition-colors duration-300"
              >
                {type}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-6xl">
          <Reveal>
            <div className="text-center mb-14">
              <p className="uppercase tracking-widest text-primary text-sm font-bold mb-3">What we offer</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">Our services in {city.name}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 0.08}>
                <Link href={`/services/${service.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full border border-neutral-100">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={service.image} alt={`${service.title} in ${city.name}, UT`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {service.focus && (
                      <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                        Our Specialty
                      </span>
                    )}
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                    <p className="text-neutral-600 mb-5 leading-relaxed">{service.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold text-lg">{service.price}</span>
                      <span className="text-primary text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <Reveal>
            <div className="text-center mb-14">
              <p className="uppercase tracking-widest text-primary text-sm font-bold mb-3">Real results</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">Couches we have brought back to life</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImgs.map((img, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className={`relative rounded-2xl overflow-hidden shadow-md group ${i % 5 === 0 ? 'md:row-span-2 aspect-[3/4] md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}>
                  <Image src={img} alt={`Sofa and couch cleaning by LivinGreen near ${city.name}, UT`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom max-w-6xl">
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-accent text-2xl mb-2">★★★★★</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900">Loved by {city.county} families</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {reviews.map((review, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-sm h-full flex flex-col">
                  <div className="text-accent text-lg mb-4">{'★'.repeat(review.rating)}</div>
                  <p className="text-neutral-700 leading-relaxed italic flex-grow">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-6">
                    <p className="font-bold text-neutral-900">{review.name}</p>
                    <p className="text-sm text-neutral-500">{review.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 text-center mb-12">
              Questions from {city.name} customers
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center gap-4 p-6 text-left"
                  >
                    <span className="font-bold text-lg text-neutral-900">{faq.question}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="text-accent text-3xl leading-none flex-shrink-0">
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-neutral-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-neutral-950">
        <div className="container-custom py-0">
          <iframe
            title={`LivinGreen service area in ${city.name}, UT`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(city.name + ', UT')}&z=12&output=embed`}
            className="w-full h-[380px] border-0 grayscale-[0.3] opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Ready for a fresh, clean couch in {city.name}?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/85">
              Free on site estimates, same week availability, and a finish you will love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary text-lg px-10 py-4">
                Message Us on WhatsApp
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="bg-white text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-neutral-100 transition-colors duration-300">
                Call {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEARBY CITIES */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
              We also serve nearby {city.county} cities
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {nearby.map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 0.04, 0.4)}>
                <Link href={`/locations/${c.slug}`} className="px-5 py-2.5 bg-neutral-50 rounded-full text-neutral-700 hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm font-medium">
                  {c.name}
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <Link href="/locations" className="px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-sm font-semibold">
                View all areas →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
