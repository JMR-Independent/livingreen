import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollAnimation from '@/components/ScrollAnimation';
import PageHero from '@/components/PageHero';
import { SERVICES } from '@/lib/constants';

export const metadata = {
  title: 'Our Services',
  description: 'Professional cleaning services for carpets, upholstery, mattresses, car interiors, and fabric protection in Utah.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Our"
        titleHighlight="Services"
        description="Professional cleaning solutions tailored to your needs"
        backgroundImage="/images/2020/04/Servicio-Alfombras-OK.jpg"
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-white text-3xl font-bold">{service.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-neutral-700 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Starting at</p>
                      <p className="text-accent font-bold text-3xl">{service.price}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom text-center">
          <h2 className="text-display-md mb-6">Ready to Get Started?</h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote and experience the difference professional cleaning makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-10 py-4">
              Get a Free Quote
            </Link>
            <a
              href="tel:+18015550100"
              className="btn-outline text-lg px-10 py-4"
            >
              Call (801) 555-0100
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
