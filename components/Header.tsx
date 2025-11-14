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
            <div
              className="relative transition-transform duration-300 group-hover:scale-105"
              style={{
                width: isScrolled ? '140px' : '180px',
                height: isScrolled ? '35px' : '45px',
              }}
            >
              {/* La imagen del logo */}
              <Image
                src="/images/logo.png"
                alt={COMPANY_INFO.name}
                fill
                className="object-contain object-left"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-center bg-neutral-100 text-neutral-700"
                  >
                    Call {COMPANY_INFO.phoneDisplay}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-center bg-primary text-white"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
