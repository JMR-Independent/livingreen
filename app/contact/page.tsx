'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollAnimation from '@/components/ScrollAnimation';
import PageHero from '@/components/PageHero';
import { COMPANY_INFO } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Wait a moment for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create WhatsApp message with form data
    const whatsappMessage = `
*New Quote Request from Website*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*City:* ${formData.city}
*Service:* ${formData.service}

*Message:*
${formData.message}
    `.trim();

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Get In"
        titleHighlight="Touch"
        description="Ready for professional cleaning? Contact us today for a free quote"
        backgroundImage="/images/2020/03/seccion-contacto-landing-alfombras.jpg"
      />

      {/* Contact Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-neutral-100" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollAnimation>
                <h2 className="text-display-sm mb-8 text-neutral-900">Contact Information</h2>

                {/* Phone */}
                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/70 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-neutral-900">Phone</h3>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="text-neutral-700 hover:text-primary transition-colors font-medium">
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/70 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-neutral-900">Email</h3>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-neutral-700 hover:text-primary transition-colors font-medium">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl hover:bg-white/70 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-neutral-900">Business Hours</h3>
                    <p className="text-neutral-700 text-sm mb-1 font-medium">{COMPANY_INFO.hours.weekdays}</p>
                    <p className="text-neutral-700 text-sm mb-1 font-medium">{COMPANY_INFO.hours.saturday}</p>
                    <p className="text-neutral-700 text-sm font-medium">{COMPANY_INFO.hours.sunday}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-3 text-neutral-900">Quick Response via WhatsApp</h3>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Message Us Now
                  </a>
                </div>
              </ScrollAnimation>
            </div>

            {/* Contact Form - 3 columns */}
            <ScrollAnimation className="lg:col-span-3" delay={0.2}>
              <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300">
                <h2 className="text-display-sm mb-2 text-neutral-900">Get a Free Quote</h2>
                <p className="text-neutral-700 mb-8">Fill out the form below and we'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all shadow-sm"
                        placeholder="(801) 555-0100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-2">
                        City *
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all shadow-sm"
                      >
                        <option value="">Select a city</option>
                        <option value="santaquin">Santaquin</option>
                        <option value="spanish-fork">Spanish Fork</option>
                        <option value="provo">Provo</option>
                        <option value="orem">Orem</option>
                        <option value="salt-lake-city">Salt Lake City</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all shadow-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="carpet">Area Rug Cleaning</option>
                      <option value="upholstery">Upholstery Cleaning</option>
                      <option value="mattress">Mattress Cleaning</option>
                      <option value="car">Car Interior Detailing</option>
                      <option value="protection">Protection & Waterproofing</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white/90 outline-none transition-all resize-none shadow-sm"
                      placeholder="Tell us about your cleaning needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-neutral-100 via-primary/5 to-accent/5">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-display-md mb-6 text-neutral-900">Service Area</h2>
          <p className="text-neutral-700 text-lg mb-8">
            We proudly serve the following cities in Utah
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {COMPANY_INFO.cities.map((city, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-xl px-6 py-3 rounded-full border border-white/60 shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300 text-neutral-800 font-semibold"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
