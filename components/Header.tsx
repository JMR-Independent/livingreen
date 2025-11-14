'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-md"
      style={{
        height: '70px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }}
    >
      <nav className="container-custom h-full">
        <div className="flex items-center justify-between gap-8 h-full">
          {/* Logo - Izquierda */}
          <Link href="/" className="relative group flex-shrink-0" style={{ zIndex: 10 }}>
            {/* Contenedor del logo limpio */}
            <div className="relative transition-transform duration-300 group-hover:scale-105">
              {/* La imagen del logo */}
              <Image
                src="/images/logo.png"
                alt={COMPANY_INFO.name}
                width={240}
                height={60}
                className="object-contain object-left"
                style={{
                  width: isScrolled ? '200px' : '240px',
                  height: 'auto',
                }}
                priority
                quality={100}
              />
            </div>
          </Link>

          {/* Desktop Navigation - Centrado con efectos modernos */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className="relative px-3 py-2.5 text-sm font-bold text-neutral-700 transition-all duration-300 group tracking-wide"
              >
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </span>

                {/* Línea inferior animada */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-full transition-all duration-500 ease-out" />

                {/* Resplandor al hover */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg transition-opacity duration-300" />

                {/* Puntos decorativos */}
                <motion.span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button - Derecha */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="text-sm font-bold text-neutral-700 transition-colors duration-300 hover:text-primary"
            >
              {COMPANY_INFO.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={cn(
                  'block h-0.5 w-full transform transition-all duration-300 bg-neutral-900',
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full transition-all duration-300 bg-neutral-900',
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full transform transition-all duration-300 bg-neutral-900',
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/95 backdrop-blur-xl lg:hidden"
                style={{ top: '70px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Decorative gradient orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
              </motion.div>

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="fixed inset-0 lg:hidden overflow-y-auto"
                style={{ top: '70px' }}
              >
                <div className="relative z-10 min-h-full px-6 py-12 flex flex-col justify-center">
                  {/* Navigation Links */}
                  <nav className="space-y-2 mb-12">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <Link
                          href={item.href}
                          prefetch={true}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group block relative"
                        >
                          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                            {/* Icon Circle */}
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                              <span className="text-2xl text-white">
                                {index === 0 && '🏠'}
                                {index === 1 && '✨'}
                                {index === 2 && 'ℹ️'}
                                {index === 3 && '📸'}
                                {index === 4 && '⭐'}
                                {index === 5 && '❓'}
                                {index === 6 && '📧'}
                              </span>
                            </div>

                            {/* Text */}
                            <span className="text-2xl font-bold text-white tracking-tight">
                              {item.name}
                            </span>

                            {/* Arrow */}
                            <svg
                              className="ml-auto w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="space-y-4"
                  >
                    {/* Phone Button */}
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-primary font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {COMPANY_INFO.phoneDisplay}
                    </a>

                    {/* Quote Button */}
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-accent text-white font-bold text-lg shadow-2xl hover:shadow-accent/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Get a Free Quote
                    </Link>
                  </motion.div>

                  {/* Decorative Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-12 text-center"
                  >
                    <p className="text-white/60 text-sm font-medium">
                      Professional Cleaning Services
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
