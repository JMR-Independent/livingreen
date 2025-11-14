'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import { FAQS } from '@/lib/constants';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container-custom">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our cleaning services
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          {FAQS.map((faq, index) => (
            <ScrollAnimation key={index} delay={index * 0.05}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full bg-white rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-primary transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-primary/10 flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pr-12">
                          <p className="text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={0.6}>
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-3xl p-8 shadow-lg">
              <p className="text-neutral-700 mb-4">Still have questions?</p>
              <a
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Contact Us
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
