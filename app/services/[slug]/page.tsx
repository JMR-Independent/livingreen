import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES, COMPANY_INFO } from '@/lib/constants';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  if (!service) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in ${service.title}. Can you provide me with more information?`
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/70 to-neutral-900/50" />

        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            {service.description}
          </p>
          <div className="mt-8">
            <span className="inline-block bg-accent text-white px-8 py-3 rounded-full text-2xl font-bold">
              {service.price}
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display-md text-center mb-12">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-neutral-50 p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-accent"
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
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-lg">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <h2 className="text-display-md text-center mb-16">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Contact Us', description: 'Call or message us for a free quote' },
              { step: '2', title: 'Schedule', description: 'Choose a convenient time for service' },
              { step: '3', title: 'We Clean', description: 'Our experts perform thorough cleaning' },
              { step: '4', title: 'Enjoy', description: 'Relax in your fresh, clean space' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-display-md mb-6">Ready to Book This Service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get professional {service.title.toLowerCase()} services today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-10 py-4"
            >
              Message Us on WhatsApp
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="bg-white text-primary px-10 py-4 rounded-full font-medium text-lg hover:bg-neutral-100 transition-colors duration-300"
            >
              Call {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-display-md text-center mb-12">Other Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((otherService) => (
              <Link
                key={otherService.id}
                href={`/services/${otherService.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={otherService.image}
                    alt={otherService.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-xl">{otherService.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-600 mb-4">{otherService.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-bold">{otherService.price}</span>
                    <span className="text-primary group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
