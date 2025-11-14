'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';

const galleryImages = [
  { src: '/images/2020/04/7.jpg', title: 'Upholstery Cleaning', category: 'upholstery' },
  { src: '/images/2020/04/5.jpg', title: 'Carpet Cleaning', category: 'carpet' },
  { src: '/images/2020/04/2.jpg', title: 'Area Rug Cleaning', category: 'carpet' },
  { src: '/images/2020/04/3.jpg', title: 'Professional Cleaning', category: 'carpet' },
  { src: '/images/2020/04/1.jpg', title: 'Deep Cleaning', category: 'carpet' },
  { src: '/images/2020/04/6.jpg', title: 'Furniture Cleaning', category: 'upholstery' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">Our Work</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              See the difference our professional cleaning services make
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedImage(index)}
                className="relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative w-full max-w-5xl aspect-video"
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].title}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
