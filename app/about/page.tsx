import Image from 'next/image';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'About Us',
  description: 'Learn about LivinGreen - your trusted professional cleaning service with 7+ years of experience.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="About"
        titleHighlight="LivinGreen"
        description="Professional cleaning services you can trust"
        backgroundImage="/images/gallery/gallery-11.jpg"
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <div>
                <h2 className="text-display-md mb-6">Our Story</h2>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    LivinGreen is a family business that began its journey in Chile in 2018. For five years, we built our reputation there, learning the craft and serving our community with dedication and care. In 2023, our family made the move to Utah, bringing with us the same commitment to excellence and personal service that defined our work from the beginning.
                  </p>
                  <p>
                    We may not use large industrial machines, but we've mastered the art of professional cleaning with portable equipment that delivers outstanding results. Our approach is personal, efficient, and effective – qualities that hundreds of satisfied customers across Utah can attest to.
                  </p>
                  <p>
                    Our commitment to eco-friendly practices and customer satisfaction drives everything we do. We use EPA-certified cleaning products that are safe for your family, pets, and the environment. Every job receives our full attention and expertise, because for us, this isn't just business – it's a family tradition of quality service.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/gallery-15.jpg"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-display-md mb-4">Why Choose LivinGreen?</h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                We go above and beyond to ensure your complete satisfaction
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Equipment',
                description: 'We use top-of-the-line Swiss and German cleaning machines that deliver superior results while using 80% less water than traditional methods.',
              },
              {
                title: 'Eco-Friendly Products',
                description: 'All our cleaning solutions are EPA-certified, biodegradable, and safe for children, pets, and the environment.',
              },
              {
                title: 'Fast Drying Time',
                description: 'Our advanced extraction technology means your carpets and upholstery dry in just 4-6 hours, not days.',
              },
              {
                title: 'Trained Professionals',
                description: 'Our technicians undergo rigorous training and stay updated on the latest cleaning techniques and industry standards.',
              },
              {
                title: 'Satisfaction Guarantee',
                description: 'We stand behind our work with a 5-day satisfaction guarantee. If you\'re not happy, we\'ll make it right.',
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees or surprises. We provide detailed quotes upfront so you know exactly what to expect.',
              },
            ].map((item, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '5,000+', label: 'Happy Customers' },
              { number: '99.9%', label: 'Allergen Removal' },
              { number: '100%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div>
                  <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-display-md mb-4">Our Core Values</h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Excellence',
                description: 'We are committed to delivering the highest quality service on every job, every time.',
              },
              {
                title: 'Integrity',
                description: 'We operate with honesty, transparency, and respect in all our customer interactions.',
              },
              {
                title: 'Sustainability',
                description: 'We prioritize eco-friendly practices that protect both your home and our planet.',
              },
              {
                title: 'Innovation',
                description: 'We continuously invest in the latest technology and training to serve you better.',
              },
            ].map((value, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom text-center">
          <ScrollAnimation>
            <h2 className="text-display-md mb-6">Ready to Experience the Difference?</h2>
            <p className="text-neutral-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust LivinGreen for their cleaning needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-10 py-4">
                Get a Free Quote
              </Link>
              <Link href="/services" className="btn-outline text-lg px-10 py-4">
                View Our Services
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
}
