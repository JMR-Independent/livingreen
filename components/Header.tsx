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

        {/* Mobile Menu - Overlay Full Screen */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
              >
                {/* Header del menú */}
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">LivinGreen</h3>
                      <p className="text-sm text-white/90">Professional Cleaning</p>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      aria-label="Close menu"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="p-6 space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold text-neutral-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20"
                      >
                        <span>{item.name}</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="px-6 pb-6 space-y-3 border-t border-neutral-200 pt-6">
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-700 hover:from-neutral-200 hover:to-neutral-300 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{COMPANY_INFO.phoneDisplay}</span>
                  </motion.a>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>Get a Free Quote</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Footer Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-6 pb-6 text-center text-sm text-neutral-500"
                >
                  <p className="mb-2">📍 Serving Utah County</p>
                  <p className="text-xs">Santaquin to Salt Lake City</p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
